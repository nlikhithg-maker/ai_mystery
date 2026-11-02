import React, { createContext, useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, BookOpen, ClipboardList, Eye, Fingerprint, LogOut, Moon, Plus, Send, ShieldCheck, Sun, UserRound } from 'lucide-react';
import './styles.css';

const api = axios.create({ baseURL: '/api' });
const Auth = createContext(null);
const useAuth = () => useContext(Auth);
const errText = (error) => error.response?.data?.message || 'Something went wrong. Please try again.';

function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('amr_session') || 'null');
    if (saved?.token) api.defaults.headers.common.Authorization = `Bearer ${saved.token}`;
    return saved;
  });
  useEffect(() => {
    if (session?.token) {
      localStorage.setItem('amr_session', JSON.stringify(session));
      api.defaults.headers.common.Authorization = `Bearer ${session.token}`;
    } else {
      localStorage.removeItem('amr_session');
      delete api.defaults.headers.common.Authorization;
    }
  }, [session]);
  return <Auth.Provider value={{ session, setSession }}>{children}</Auth.Provider>;
}

function Shell({ children }) {
  const { session, setSession } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('amr_theme') || 'light');
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('amr_theme', theme); }, [theme]);
  const toggleTheme = () => setTheme(current => current === 'dark' ? 'light' : 'dark');
  return <><header><Link className="brand" to={session ? '/dashboard' : '/'}><Fingerprint /> AI Mystery Room</Link><nav><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}<span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>{session ? <><Link to="/dashboard">Cases</Link><Link to="/profile">Profile</Link><button className="ghost" onClick={() => setSession(null)}><LogOut size={17} /> Log out</button></> : <><Link to="/login">Log in</Link><Link className="primary nav-cta" to="/register">Begin investigating</Link></>}</nav></header>{children}</>;
}

function AuthPage({ mode }) {
  const { session, setSession } = useAuth(); const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' }); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  if (session) return <Navigate to="/dashboard" />;
  const submit = async (event) => { event.preventDefault(); setError(''); setBusy(true); try { const { data } = await api.post(`/auth/${mode === 'login' ? 'login' : 'register'}`, form); setSession(data); nav('/dashboard'); } catch (e) { setError(errText(e)); } finally { setBusy(false); } };
  return <main className="center"><section className="auth-card"><Fingerprint className="accent-icon" size={36} /><h1>{mode === 'login' ? 'Welcome back, detective' : 'Start your first investigation'}</h1><p>{mode === 'login' ? 'Log in to return to your case files.' : 'Create an account to save your cases.'}</p><form onSubmit={submit}>{mode === 'register' && <label>Name<input required minLength="2" maxLength="80" autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>}<label>Email<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required type="password" minLength="8" maxLength="128" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>{error && <p className="error" role="alert">{error}</p>}<button disabled={busy} className="primary">{busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}</button></form><p className="switch">{mode === 'login' ? <>New here? <Link to="/register">Create an account</Link></> : <>Already registered? <Link to="/login">Log in</Link></>}</p></section></main>;
}

function Landing() { return <main className="hero"><div><span className="eyebrow">FICTIONAL CASE FILES · AI ASSISTED</span><h1>Every clue has a story.</h1><p>Create a mystery from any scenario, study its evidence, and name the culprit before the truth is revealed.</p><Link className="primary link-button" to="/register">Begin investigating <ArrowLeft className="flip" size={18}/></Link><p className="hero-caption">A private detective desk for stories only. No real world cases.</p></div><div className="case-preview"><span>CASE FILE · 001</span><Fingerprint size={76}/><h3>The Archive After Midnight</h3><p>3 suspects. 6 pieces of evidence. One hidden truth.</p><div className="preview-stamp">UNSOLVED</div></div></main>; }
function Protected({ children }) { return useAuth().session ? children : <Navigate to="/login" replace />; }

function Dashboard() {
  const [cases, setCases] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  const load = () => api.get('/investigations').then(r => setCases(r.data)).catch(e => setError(errText(e))).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  const active = cases.filter(c => c.status === 'active').length;
  const remove = async (id) => { if (!confirm('Delete this case file and its notes?')) return; try { await api.delete(`/investigations/${id}`); load(); } catch (e) { setError(errText(e)); } };
  return <main className="page dashboard-page"><div className="page-title dashboard-heading"><div><span className="eyebrow">YOUR CASE FILES</span><h1>Investigation desk</h1><p>Every open file is a story waiting to be solved.</p></div><Link className="primary link-button" to="/create"><Plus size={18}/> Create mystery</Link></div><div className="stats"><Stat label="Total cases" value={cases.length}/><Stat label="Active" value={active}/><Stat label="Completed" value={cases.length - active}/></div>{error && <p className="error" role="alert">{error}</p>}{loading ? <p className="muted">Loading your case files…</p> : <section className="case-list">{cases.length ? cases.map(c => <article className="case-card" key={c._id}><div><span className={`pill ${c.status}`}>{c.status}</span><h2>{c.title}</h2><p>{c.description}</p><small>{c.caseId} · {c.difficulty} · {new Date(c.createdAt).toLocaleDateString()}</small></div><div className="case-actions"><Link className="secondary link-button" to={`/investigations/${c._id}`}>{c.status === 'active' ? 'Continue' : 'View result'}</Link><button className="text-button" onClick={() => remove(c._id)}>Delete</button></div></article>) : <Empty icon={<BookOpen/>} title="No cases yet" text="Turn a fictional scenario into your first investigation." action="Create a mystery" to="/create" />}</section>}</main>;
}
function Stat({ label, value }) { return <div className="stat"><strong>{value}</strong><span>{label}</span></div>; }

function Create() {
  const nav = useNavigate(); const [form, setForm] = useState({ title: '', difficulty: 'medium', scenario: '' }); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { const { data } = await api.post('/investigations', form); nav(`/investigations/${data._id}`); } catch (e) { setError(errText(e)); } finally { setBusy(false); } };
  return <main className="page create-page"><Link className="back create-back" to="/dashboard"><ArrowLeft size={16}/> Back to desk</Link><div className="create-layout"><aside className="create-context"><span className="eyebrow">THE INVESTIGATOR’S DESK</span><h2>Every mystery starts with one detail.</h2><p>Set the scene. Leave the clues to us. Your next case is waiting to be opened.</p><div className="evidence-board" aria-hidden="true"><div className="board-label">CASE FILE <b>014</b><span>UNSOLVED</span></div><div className="board-string string-one"/><div className="board-string string-two"/><div className="board-card board-card-photo"><Fingerprint size={42}/><span>PERSON OF INTEREST</span></div><div className="board-card board-card-note"><b>LAST SEEN</b><span>Just before midnight</span></div><div className="board-pin pin-one"/><div className="board-pin pin-two"/><span className="board-stamp">EVIDENCE</span></div><div className="desk-steps"><span><b>01</b> Your scenario</span><span><b>02</b> The evidence</span><span><b>03</b> Your verdict</span></div><small className="fiction-note">FICTIONAL CASES ONLY · FOR THE CURIOSITY OF IT</small></aside><section className="create-panel"><span className="eyebrow">NEW INVESTIGATION</span><h1>What happened?</h1><p className="lead">Give us a fictional incident, setting, or premise. We’ll turn it into a complete, solvable case.</p><form className="create-form" onSubmit={submit}><label>Case title <em>optional</em><input maxLength="120" placeholder="e.g. The Vanishing Violin" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/></label><label>Difficulty<div className="difficulty">{['easy','medium','hard'].map(d => <button type="button" className={form.difficulty === d ? 'selected' : ''} aria-pressed={form.difficulty === d} onClick={() => setForm({ ...form, difficulty: d })} key={d}>{d}</button>)}</div></label><label>Fictional scenario<textarea required minLength="30" maxLength="2000" value={form.scenario} onChange={e => setForm({ ...form, scenario: e.target.value })} placeholder="A valuable object disappears from a locked museum room just before opening night..."/><small>{form.scenario.length}/2000 characters</small></label>{error && <p className="error" role="alert">{error}</p>}<button disabled={busy} className="primary">{busy ? 'Generating case file…' : 'Generate investigation'} <Send size={17}/></button><p className="muted form-footnote">Generation may take a few moments. Every case is fictional.</p></form></section></div></main>;
}

function Investigation() {
  const { id } = useParams(); const [item, setItem] = useState(null); const [tab, setTab] = useState('overview'); const [selected, setSelected] = useState(''); const [note, setNote] = useState(''); const [editing, setEditing] = useState(null); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const load = () => api.get(`/investigations/${id}`).then(r => { setItem(r.data); setSelected(r.data.selectedSuspectId || ''); }).catch(e => setError(errText(e)));
  useEffect(() => { load(); }, [id]);
  if (error && !item) return <main className="page"><p className="error" role="alert">{error}</p><Link className="secondary link-button" to="/dashboard">Back to cases</Link></main>;
  if (!item) return <main className="page">Loading case file…</main>;
  const submit = async () => { if (!selected || !confirm('Submit this final accusation? You cannot change it.')) return; setBusy(true); try { await api.post(`/investigations/${id}/submit`, { suspectId: selected }); await load(); } catch (e) { setError(errText(e)); } finally { setBusy(false); } };
  const saveNote = async (event) => { event.preventDefault(); if (!note.trim()) return; setBusy(true); setError(''); try { await api.post(`/investigations/${id}/notes`, { body: note }); setNote(''); await load(); } catch (e) { setError(errText(e)); } finally { setBusy(false); } };
  const updateNote = async (event) => { event.preventDefault(); setBusy(true); try { await api.patch(`/investigations/${id}/notes/${editing._id}`, { body: note, suspectId: editing.suspectId || undefined, evidenceId: editing.evidenceId || undefined }); setEditing(null); setNote(''); await load(); } catch (e) { setError(errText(e)); } finally { setBusy(false); } };
  const deleteNote = async (noteId) => { try { await api.delete(`/investigations/${id}/notes/${noteId}`); await load(); } catch (e) { setError(errText(e)); } };
  const startEdit = (entry) => { setEditing(entry); setNote(entry.body); };
  const navItems = [['overview','Case overview'],['suspects','Suspects'],['evidence','Evidence'],['timeline','Timeline'],['notes','My notes']];
  return <main className="room"><aside className="room-nav"><Link className="back" to="/dashboard"><ArrowLeft size={16}/> Case files</Link><span className="case-no">{item.caseId}</span><h2>{item.title}</h2>{navItems.map(([key,label]) => <button className={tab === key ? 'active' : ''} onClick={() => setTab(key)} key={key}>{key === 'suspects' ? <UserRound/> : key === 'evidence' || key === 'timeline' ? <ClipboardList/> : key === 'notes' ? <BookOpen/> : <Eye/>}{label}</button>)}</aside><section className="room-content">{error && <p className="error" role="alert">{error}</p>}{item.status === 'completed' ? <Result item={item}/> : <>{tab === 'overview' && <Overview item={item}/>} {tab === 'suspects' && <Suspects suspects={item.suspects}/>} {tab === 'evidence' && <Evidence evidence={item.evidence}/>} {tab === 'timeline' && <Timeline item={item}/>} {tab === 'notes' && <Notes notes={item.notes} note={note} setNote={setNote} save={editing ? updateNote : saveNote} editing={editing} cancel={() => { setEditing(null); setNote(''); }} startEdit={startEdit} remove={deleteNote} busy={busy}/>}</>}</section>{item.status === 'active' && <aside className="accuse"><span className="eyebrow">FINAL ACCUSATION</span><h3>Who is responsible?</h3><p>Review the case before making your final choice.</p>{item.suspects.map(s => <label className={`suspect-option ${selected === s.id ? 'chosen' : ''}`} key={s.id}><input type="radio" name="suspect" checked={selected === s.id} onChange={() => setSelected(s.id)}/><span><b>{s.name}</b><small>{s.occupation}</small></span></label>)}<button disabled={!selected || busy} onClick={submit} className="primary">{busy ? 'Submitting…' : 'Submit accusation'} <ShieldCheck size={17}/></button><small className="muted">Your choice is final. The solution appears after submission.</small></aside>}</main>;
}

function Overview({ item }) { return <article className="reading"><div className="case-heading"><span className="pill">{item.difficulty}</span><span className="pill status-pill">{item.status}</span></div><h1>{item.title}</h1><p className="lead">{item.introduction}</p><hr/><h3>Incident report</h3><p>{item.description}</p><dl><div><dt>Location</dt><dd>{item.location}</dd></div><div><dt>Incident time</dt><dd>{item.incidentAt || 'Under investigation'}</dd></div><div><dt>Type</dt><dd>{item.incidentType || 'Mystery'}</dd></div></dl><h3>How to investigate</h3><p>Compare statements, records, and clues. A convincing clue may still be misleading. The final accusation cannot be changed once submitted.</p></article>; }
function Suspects({ suspects }) { return <div><span className="eyebrow">PERSONS OF INTEREST</span><h1>Suspects</h1><div className="grid">{suspects.map(s => <article className="detail-card" key={s.id}><span className="avatar">{s.name.split(' ').map(x => x[0]).join('')}</span><h2>{s.name}</h2><p>{s.age ? `${s.age} · ` : ''}{s.occupation}</p><hr/><p>{s.profile}</p><Info label="Connection" value={s.relationship}/><Info label="Possible motive" value={s.motive}/><Info label="Alibi" value={s.alibi}/><Info label="Observed behavior" value={s.suspiciousBehavior}/></article>)}</div></div>; }

function Evidence({ evidence }) {
  return <div><span className="eyebrow">COLLECTED MATERIAL</span><h1>Evidence</h1><p className="muted">Review each record and decide how much weight it deserves.</p><div className="evidence-list">{evidence.map(e => <article className="evidence" key={e.id}><div><span className="pill">{e.category}</span><h2>{e.title}</h2><p>{e.description}</p>{e.relatedSuspects?.length > 0 && <small>References: {e.relatedSuspects.join(', ')}</small>}</div><EvidenceContent item={e}/></article>)}</div></div>;
}
function Timeline({ item }) {
  const rows = item.evidence.map(e => {
    const content = e.content && typeof e.content === 'object' ? e.content : {};
    const messages = Array.isArray(content.messages) ? content.messages : [];
    const stamps = messages.map(m => m.time || m.timestamp).filter(Boolean);
    const stamp = content.time || content.timestamp || content.date || content.recordingTime || stamps[0] || '';
    return { id: e.id, stamp, title: e.title, description: e.clue || e.description };
  });
  return <div><span className="eyebrow">ORDER OF EVENTS</span><h1>Case timeline</h1><p className="muted">Built from the timestamps and records attached to the evidence. The complete solution timeline stays sealed until your accusation.</p><ol className="case-timeline">{rows.map(row => <li key={row.id}><span className="timeline-stamp">{row.stamp || 'TIME UNCONFIRMED'}</span><b>{row.title}</b><p>{row.description}</p></li>)}</ol></div>;
}
function EvidenceContent({ item }) {
  const data = item.content && typeof item.content === 'object' ? item.content : { text: item.content };
  const messages = data.messages;
  const isCctv = /cctv|camera|recording/i.test(item.category || '') || data.camera || data.observation;
  const isWitness = /witness/i.test(item.category || '') || data.statement;
  const isImage = /photograph|image/i.test(item.category || '');
  return <div className="evidence-content">{isImage ? <EvidenceMedia url={item.mediaUrl} description={item.description} prompt={data.prompt || data.text}/> : Array.isArray(messages) ? <div className="chat-evidence"><div className="chat-top">FICTIONAL MESSAGE RECORD <small>{data.date || data.conversationDate || ''}</small></div>{messages.map((m, i) => <div className={`chat-message ${i % 2 ? 'sent' : ''}`} key={`${m.time || ''}-${i}`}><small>{m.from || m.sender || 'Unknown'} · {m.time || m.timestamp || ''}</small><span>{m.text || m.message}</span></div>)}</div> : isCctv ? <div className="cctv-evidence"><div className="cctv-screen"><span>SIMULATED RECORDING · FICTIONAL AI EVIDENCE</span><b>{data.time || item.recordingTime || '20:17:04'}</b><div className="scanlines"/><Fingerprint size={38}/></div><p><b>{data.camera || data.cameraId || 'CAM-01'}</b> · {data.location || 'Camera location not specified'}</p><p>{data.observation || data.description || data.recordingDescription || item.description}</p>{Array.isArray(data.events) && <ol>{data.events.map((event, i) => <li key={i}>{typeof event === 'string' ? event : `${event.time || ''} ${event.description || event.activity || ''}`}</li>)}</ol>}</div> : isWitness ? <blockquote className="witness-quote">“{data.statement || data.text || item.description}”<footer>{data.witness || data.name || 'Witness'}{data.occupation ? ` · ${data.occupation}` : ''}{data.time ? ` · ${data.time}` : ''}</footer></blockquote> : <div className="structured-evidence">{Object.entries(data).map(([key, value]) => <p key={key}><b>{key.replace(/([A-Z])/g, ' $1').replace(/^./, x => x.toUpperCase())}</b><span>{Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}</span></p>)}</div>}<p className="clue"><b>Investigator note:</b> {item.clue}</p><small>Reliability: {item.reliability} · Importance: {item.importance}</small></div>;
}
function EvidenceMedia({ url, description, prompt }) {
  const [failed, setFailed] = useState(false);
  return url && !failed ? <img className="evidence-image" src={url} alt={description} onError={() => setFailed(true)}/> : <div className="image-placeholder"><Fingerprint size={36}/><b>Image evidence placeholder</b><span>{description}</span>{prompt && <small>Visual brief: {prompt}</small>}<small>AI image generation can be connected through a separate media provider.</small></div>;
}

function Notes({ notes = [], note, setNote, save, editing, cancel, startEdit, remove, busy }) {
  return <div><span className="eyebrow">PRIVATE NOTEBOOK</span><h1>Investigation notes</h1><form className="note-form" onSubmit={save}><label>{editing ? 'Edit note' : 'Add a note'}<textarea required maxLength="1500" value={note} onChange={e => setNote(e.target.value)} placeholder="Record a connection, contradiction, or theory…"/><small>{note.length}/1500 characters</small></label><div className="note-actions"><button disabled={busy || !note.trim()} className="primary">{editing ? 'Save changes' : 'Save note'}</button>{editing && <button type="button" className="secondary" onClick={cancel}>Cancel</button>}</div></form><div className="notes">{notes.length ? notes.map(n => <article key={n._id}><div>{n.body}</div><small>{new Date(n.updatedAt || n.createdAt).toLocaleString()}</small><div className="note-actions"><button className="text-button" onClick={() => startEdit(n)}>Edit</button><button className="text-button danger-text" onClick={() => remove(n._id)}>Delete</button></div></article>) : <p>No notes yet. They are private to this investigation.</p>}</div></div>;
}

function Result({ item }) {
  const culprit = item.suspects.find(s => s.id === item.solution.culpritId);
  const accused = item.suspects.find(s => s.id === item.selectedSuspectId);
  return <article className="result"><span className={`result-icon ${item.result ? 'right' : 'wrong'}`}>{item.result ? '✓' : '×'}</span><span className="eyebrow">CASE CLOSED · {item.caseId}</span><h1>{item.result ? 'You solved it.' : 'Not quite.'}</h1><p className="lead">The culprit was <b>{culprit?.name}</b>. Your accusation was {item.result ? 'correct' : 'incorrect'}.</p>{!item.result && accused && <><h3>Your accusation</h3><p>You named {accused.name}, whose stated alibi was: “{accused.alibi}” The decisive evidence below points to {culprit?.name} instead.</p></>}<h3>Motive</h3><p>{item.solution.motive}</p><h3>What happened</h3><p>{item.solution.explanation}</p><h3>The decisive clues</h3><ul>{item.solution.importantClues?.map((x, i) => <li key={i}>{x}</li>)}</ul>{item.solution.misleadingClues?.length > 0 && <><h3>Misleading clues explained</h3><ul>{item.solution.misleadingClues.map((x, i) => <li key={i}>{x}</li>)}</ul></>}<h3>Timeline</h3><ol>{item.solution.timeline?.map((x, i) => <li key={i}>{x}</li>)}</ol><p className="conclusion">{item.solution.conclusion}</p></article>;
}
function Info({ label, value }) { return value ? <p className="info"><b>{label}</b>{value}</p> : null; }
function Empty({ icon, title, text, action, to }) { return <div className="empty">{icon}<h2>{title}</h2><p>{text}</p><Link className="secondary link-button" to={to}>{action}</Link></div>; }
function Profile() {
  const [profile, setProfile] = useState(null); const [error, setError] = useState('');
  useEffect(() => { api.get('/profile').then(r => setProfile(r.data)).catch(e => setError(errText(e))); }, []);
  if (error) return <main className="page"><p className="error" role="alert">{error}</p></main>;
  if (!profile) return <main className="page">Loading profile…</main>;
  return <main className="page narrow"><span className="eyebrow">DETECTIVE PROFILE</span><h1>{profile.name}</h1><p className="lead">{profile.email}</p><div className="stats"><Stat label="Total cases" value={profile.total}/><Stat label="Completed" value={profile.completed}/><Stat label="Solved" value={profile.correct}/></div><p className="muted">Member since {new Date(profile.registeredAt).toLocaleDateString()}</p></main>;
}

function App() { return <AuthProvider><Shell><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<AuthPage mode="login"/>}/><Route path="/register" element={<AuthPage mode="register"/>}/><Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/><Route path="/create" element={<Protected><Create/></Protected>}/><Route path="/investigations/:id" element={<Protected><Investigation/></Protected>}/><Route path="/profile" element={<Protected><Profile/></Protected>}/><Route path="*" element={<main className="page"><h1>Page not found</h1><Link to="/">Return home</Link></main>}/></Routes></Shell></AuthProvider>; }
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
