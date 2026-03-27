"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, RefreshCw, Mail, ShoppingBag, Trash2, LayoutGrid, Settings, Key, Globe, Save } from "lucide-react";

interface Submission {
    id: string;
    number?: number;
    title?: string;
    email?: string;
    name?: string;
    form_name?: string;
    created_at: string;
    human_fields?: Record<string, string>;
    ordered_human_fields?: { name: string; title: string; value: string }[];
    data: Record<string, string>;
}

// -----------------------------------------------------
// DIRECT CONNECTION SETUP
// Vercel KV is handled via environment variables in your Vercel Dashboard.
// -----------------------------------------------------
// Admin secret is no longer hardcoded here. It's fetched securely upon login.

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState("");

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetStatus, setResetStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const [activeTab, setActiveTab] = useState<"all" | "contact" | "order" | "settings">("all");
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [statuses, setStatuses] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [storageStatus, setStorageStatus] = useState<{ type: string; is_kv_connected: boolean; is_blob_connected: boolean; is_resend_connected?: boolean }>({ type: "unknown", is_kv_connected: false, is_blob_connected: false, is_resend_connected: false });

    // Initial check for saved credentials
    useEffect(() => {
        const authStatus = sessionStorage.getItem("admin_auth");

        if (authStatus === "true") {
            setIsAuthenticated(true);
        }

        // Load submission statuses purely from LocalStorage
        try {
            const savedStatuses = JSON.parse(localStorage.getItem("admin_submission_statuses") || "{}");
            setStatuses(savedStatuses);
        } catch (e) { }
    }, []);

    // Fetch data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchSubmissions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setIsLoggingIn(true);

        // Simulated network delay
        await new Promise(r => setTimeout(r, 800));

        if (username && password) {
            // Credentials are verified server-side via /api/admin-auth
            // Never stored or hardcoded in client code
            try {
                const res = await fetch("/api/admin-auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                if (res.ok) {
                    const data = await res.json();
                    sessionStorage.setItem("admin_token", data.token);
                    setIsAuthenticated(true);
                    sessionStorage.setItem("admin_auth", "true");
                } else {
                    setLoginError("Invalid username or password");
                }
            } catch {
                setLoginError("Connection error. Please try again.");
            }
        } else {
            setLoginError("Please enter your credentials.");
        }
        setIsLoggingIn(false);
    };

    const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResetStatus("submitting");

        try {
            const formData = new FormData();
            formData.append("form-name", "password_reset");
            formData.append("email", resetEmail);

            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString()
            });

            setResetStatus("success");
            setTimeout(() => {
                setShowForgotPassword(false);
                setResetStatus("idle");
                setResetEmail("");
            }, 4000);
        } catch (err) {
            setResetStatus("error");
            setTimeout(() => setResetStatus("idle"), 4000);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        sessionStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
    };

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const adminToken = sessionStorage.getItem("admin_token");
            if (!adminToken) throw new Error("No admin token found. Please re-login.");

            // Fetch from our Next.js API backend (cross-platform)
            const res = await fetch("/api/submit", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const jsonResponse = await res.json();
            const apiData: Submission[] = jsonResponse.submissions || [];

            if (jsonResponse.storage) {
                setStorageStatus(jsonResponse.storage);
            }

            // Merge with local-sync data (remove dups based on email+form_name)
            let localData: Submission[] = [];
            try {
                localData = JSON.parse(localStorage.getItem("admin_local_submissions") || "[]");
            } catch (e) { }

            const syncedLocalData = localData.filter(localSub => {
                const localEmail = localSub.data.email;
                const localType = localSub.form_name || localSub.data["form-name"];

                return !apiData.some(apiSub => {
                    const apiEmail = apiSub.data.email || apiSub.email;
                    const apiType = apiSub.form_name || apiSub.data["form-name"];
                    return apiEmail === localEmail && apiType === localType;
                });
            });

            setSubmissions([...syncedLocalData, ...apiData]);
            setLoginError("")
        } catch (error: any) {
            console.error(error);
            setLoginError("Failed to fetch online data. Check your connection or re-deploy the site.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteSubmission = async (id: string) => {
        if (!confirm("Are you sure you want to delete this submission?")) return;

        try {
            const adminToken = sessionStorage.getItem("admin_token");
            
            // Delete from the API backend if it's an online submission
            if (!id.startsWith('local-')) {
                const res = await fetch(`/api/submit?id=${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                if (!res.ok) throw new Error("Failed to delete from server");
            }

            // Delete from local storage if present
            const localData: Submission[] = JSON.parse(localStorage.getItem("admin_local_submissions") || "[]");
            const updatedLocal = localData.filter(s => s.id !== id);
            localStorage.setItem("admin_local_submissions", JSON.stringify(updatedLocal));

            // Update UI state
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        const updated = { ...statuses, [id]: newStatus };
        setStatuses(updated);
        localStorage.setItem("admin_submission_statuses", JSON.stringify(updated));
    };

    // Filter by form name
    const displayedSubmissions = submissions.filter(s => {
        if (activeTab === "settings") return false;
        const type = (s.form_name || s.data["form-name"] || "").toLowerCase();
        if (activeTab === "all") return type === "contact" || type === "order";
        return type === activeTab;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-xl relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {!showForgotPassword ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <Lock size={24} />
                                </div>
                                <h1 className="text-2xl font-bold text-center mb-2 text-[var(--foreground)]">Admin Access</h1>
                                <p className="text-[var(--muted-foreground)] text-sm text-center mb-8">Enter your credentials to access the admin portal.</p>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-[var(--foreground)]">Username</label>
                                        <input
                                            type="text"
                                            required
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Username"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-blue-500/50 outline-none text-[var(--foreground)]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-[var(--foreground)]">Password</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowForgotPassword(true)}
                                                className="text-xs text-blue-500 hover:text-blue-400 font-medium transition-colors"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••••••••••"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-blue-500/50 outline-none text-[var(--foreground)]"
                                        />
                                    </div>

                                    {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}

                                    <button
                                        type="submit"
                                        disabled={isLoggingIn}
                                        className="w-full mt-4 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold flex justify-center items-center gap-2 disabled:opacity-70 transition-all"
                                    >
                                        {isLoggingIn ? "Verifying..." : "Login"}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="forgot"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <Mail size={24} />
                                </div>
                                <h1 className="text-2xl font-bold text-center mb-2 text-[var(--foreground)]">Reset Password</h1>
                                <p className="text-[var(--muted-foreground)] text-sm text-center mb-8">Enter your admin email to receive a secure reset link.</p>

                                <form name="password_reset" method="POST" onSubmit={handlePasswordReset} className="space-y-4">
                                    <input type="hidden" name="form-name" value="password_reset" />
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-[var(--foreground)]">Admin Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={resetEmail}
                                            onChange={e => setResetEmail(e.target.value)}
                                            placeholder="admin@example.com"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-purple-500/50 outline-none text-[var(--foreground)]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={resetStatus === "submitting" || resetStatus === "success"}
                                        className={`w-full mt-4 py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition-all ${resetStatus === "success" ? "bg-emerald-500" : "bg-purple-600 hover:bg-purple-700"
                                            } disabled:opacity-70`}
                                    >
                                        {resetStatus === "submitting" ? "Sending..." : resetStatus === "success" ? "Reset Link Sent!" : "Send Reset Link"}
                                    </button>
                                    {resetStatus === "error" && <p className="text-red-500 text-sm text-center mt-2">Failed to send request. Try again.</p>}

                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPassword(false)}
                                        className="w-full py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mt-2"
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--muted)] pb-20">
            {/* Admin Header */}
            <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="font-bold text-xl flex items-center gap-2 text-[var(--foreground)]">
                        <Lock size={18} className="text-blue-500" />
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchSubmissions}
                            disabled={isLoading}
                            className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-all"
                            title="Refresh Data"
                        >
                            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
                        >
                            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 mt-8">
                {/* Tabs / Filter */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "all" ? "bg-[var(--accent)] text-white shadow-lg shadow-blue-500/25" : "bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-white/5"}`}
                    >
                        <LayoutGrid size={18} /> All Submissions
                    </button>
                    <button
                        onClick={() => setActiveTab("order")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "order" ? "bg-amber-600 text-white shadow-lg shadow-amber-600/25" : "bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-white/5"}`}
                    >
                        <ShoppingBag size={18} /> Requests Only
                    </button>
                    <button
                        onClick={() => setActiveTab("contact")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "contact" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25" : "bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-white/5"}`}
                    >
                        <Mail size={18} /> Messages
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "settings" ? "bg-slate-700 text-white shadow-lg shadow-slate-700/25" : "bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-white/5"}`}
                    >
                        <Settings size={18} /> Settings
                    </button>
                </div>

                {/* Content */}
                {isLoading && displayedSubmissions.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <RefreshCw size={24} className="animate-spin text-[var(--muted-foreground)]" />
                    </div>
                ) : activeTab === "settings" ? (
                    <div className="max-w-2xl mx-auto bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                <Settings size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Vercel KV Connection Settings</h2>
                        </div>

                        <div className="space-y-6">
                            <div className={`p-4 rounded-xl border ${storageStatus.is_kv_connected ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${storageStatus.is_kv_connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                    <p className={`text-sm font-bold uppercase tracking-wider ${storageStatus.is_kv_connected ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        Redis: {storageStatus.is_kv_connected ? 'Connected' : 'Disconnected'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${storageStatus.is_blob_connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                    <p className={`text-sm font-bold uppercase tracking-wider ${storageStatus.is_blob_connected ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        Blob: {storageStatus.is_blob_connected ? 'Connected' : 'Disconnected'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${storageStatus.is_resend_connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                    <p className={`text-sm font-bold uppercase tracking-wider ${storageStatus.is_resend_connected ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        Email: {storageStatus.is_resend_connected ? 'Connected (Resend)' : 'Disconnected'}
                                    </p>
                                </div>
                                <p className="text-sm text-[var(--muted-foreground)]">
                                    {storageStatus.is_kv_connected && storageStatus.is_blob_connected && storageStatus.is_resend_connected
                                        ? "Everything is correctly connected. Submissions, files, and emails are fully operational."
                                        : "Some components are missing. Check your Vercel Project Settings -> Environment Variables."}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg">How to connect Vercel KV:</h3>
                                <ol className="list-decimal list-inside space-y-3 text-[var(--muted-foreground)] text-sm">
                                    <li>Go to your <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Vercel Dashboard</a>.</li>
                                    <li>Select your project: <span className="text-[var(--foreground)] font-mono px-1 bg-[var(--muted)] rounded">ranzo-portfolio</span>.</li>
                                    <li>Click on the <span className="text-[var(--foreground)] font-semibold">Storage</span> tab.</li>
                                    <li>Click <span className="text-[var(--foreground)] font-semibold">Connect Database</span> and choose <span className="text-[var(--foreground)] font-semibold">KV</span>.</li>
                                    <li><strong>Next</strong>, click <span className="text-[var(--foreground)] font-semibold">Connect Database</span> again and choose <span className="text-[var(--foreground)] font-semibold">Blob</span>.</li>
                                    <li>Once both are created, Vercel will automatically add the required environment variables.</li>
                                    <li>Go to <span className="text-[var(--foreground)] font-semibold">Deployments</span> and triggering a <span className="text-[var(--foreground)] font-semibold">Redeploy</span> to apply the changes.</li>
                                </ol>
                            </div>

                            <div className="pt-6 border-t border-[var(--border)]">
                                <button
                                    onClick={() => fetchSubmissions()}
                                    className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} /> Check Connection Status
                                </button>
                            </div>
                        </div>
                    </div>
                ) : displayedSubmissions.length === 0 ? (
                    <div className="text-center py-20 border border-[var(--border)] border-dashed rounded-2xl bg-[var(--card)]">
                        <p className="text-[var(--muted-foreground)]">No submissions found.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <AnimatePresence>
                            {displayedSubmissions.map((sub) => (
                                <motion.div
                                    key={sub.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pr-2 gap-2">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-lg text-[var(--foreground)]">{sub.data.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${(sub.form_name || sub.data["form-name"]) === "order"
                                                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                                        }`}>
                                                        {(sub.form_name || sub.data["form-name"]) === "order" ? "Request" : "Message"}
                                                    </span>
                                                    <select
                                                        value={statuses[sub.id] || "New"}
                                                        onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full outline-none cursor-pointer border uppercase tracking-wider ${(statuses[sub.id] || "New") === "New" ? "bg-blue-500/10 text-blue-500 border-transparent" :
                                                            statuses[sub.id] === "Pending" ? "bg-amber-500/10 text-amber-500 border-transparent" :
                                                                "bg-emerald-500/10 text-emerald-500 border-transparent"
                                                            }`}
                                                    >
                                                        <option value="New" className="bg-[var(--card)] text-blue-500">NEW</option>
                                                        <option value="Pending" className="bg-[var(--card)] text-amber-500">PENDING</option>
                                                        <option value="Completed" className="bg-[var(--card)] text-emerald-500">COMPLETED</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <a href={`mailto:${sub.data.email}`} className="text-sm text-blue-500 hover:underline">{sub.data.email}</a>
                                        </div>
                                        <div className="text-left sm:text-right flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs bg-[var(--muted)] px-3 py-1 rounded-full text-[var(--muted-foreground)] font-medium">
                                                    {new Date(sub.created_at).toLocaleString()}
                                                    {sub.id.startsWith('local-') && <span className="ml-2 text-amber-500">(Local Sync)</span>}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteSubmission(sub.id)}
                                                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete Submission"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            {sub.data.service && (
                                                <div className="flex flex-col gap-1 sm:items-end w-max sm:w-auto">
                                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500">
                                                        {sub.data.service}
                                                    </span>
                                                    {sub.data.payment_method && (
                                                        <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--muted-foreground)] opacity-70">
                                                            Paid via {sub.data.payment_method}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-[var(--border)]">
                                        <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Requirements / Message</h4>
                                        <p className="text-[var(--foreground)] whitespace-pre-wrap text-sm leading-relaxed">
                                            {sub.data.requirements || sub.data.message || "No message provided."}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-[var(--border)]/50">
                                            {sub.data.attachment ? (
                                                <a href={typeof sub.data.attachment === 'string' ? sub.data.attachment : (sub.data.attachment as any).url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-sm font-semibold hover:bg-blue-500/20 transition-colors w-max">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                    View Attachment
                                                </a>
                                            ) : (
                                                <p className="text-sm font-medium text-[var(--muted-foreground)] flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                    No attachment provided
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
