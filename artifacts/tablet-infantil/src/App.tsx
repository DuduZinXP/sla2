import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { StoryReaderPage } from '@/components/story-reader';
import { stories, storyAgeLabels, type Story } from '@/data/stories';
import NotFound from '@/pages/not-found';
import {
  BookOpen,
  Check,
  ChevronRight,
  CircleUserRound,
  Gamepad2,
  Heart,
  House,
  LockKeyhole,
  MessageCircle,
  MessageSquareHeart,
  Moon,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Send,
  Settings2,
  Sparkles,
  Star,
  Timer,
  UsersRound,
  Video,
  Volume2,
  VolumeX,
  WandSparkles,
  Wind,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type Age = '2-4' | '5-6' | '7-8';

const ages: Array<{ key: Age; label: string; sub: string; tone: string }> = [
  { key: '2-4', label: '2 a 4', sub: 'Pequenos passos', tone: 'age-peach' },
  { key: '5-6', label: '5 a 6', sub: 'Novas descobertas', tone: 'age-teal' },
  { key: '7-8', label: '7 a 8', sub: 'Grandes ideias', tone: 'age-lilac' },
];

type Activity = {
  id: string;
  title: string;
  detail: string;
  icon: ReactNode;
  color: string;
};

const activitiesByAge: Record<Age, Activity[]> = {
  '2-4': [
    { id: 'colors', title: 'Cores que abraçam', detail: 'Pinte um céu bem macio', icon: <Palette size={26} />, color: 'coral-card' },
    { id: 'story', title: 'A casinha na lua', detail: 'Uma história para ouvir', icon: <BookOpen size={26} />, color: 'teal-card' },
    { id: 'stars', title: 'Cole estrelinhas', detail: 'Encha o céu de luz', icon: <Star size={26} />, color: 'gold-card' },
  ],
  '5-6': [
    { id: 'planet', title: 'Meu planeta secreto', detail: 'Invente um lugar só seu', icon: <WandSparkles size={26} />, color: 'teal-card' },
    { id: 'story', title: 'A ponte de papel', detail: 'Uma aventura para ouvir', icon: <BookOpen size={26} />, color: 'coral-card' },
    { id: 'stars', title: 'Constelação amiga', detail: 'Ligue os pontinhos', icon: <Star size={26} />, color: 'gold-card' },
  ],
  '7-8': [
    { id: 'comic', title: 'Quadrinhos de hoje', detail: 'Desenhe a próxima cena', icon: <Palette size={26} />, color: 'coral-card' },
    { id: 'story', title: 'O mapa escondido', detail: 'Uma história para ouvir', icon: <BookOpen size={26} />, color: 'teal-card' },
    { id: 'stars', title: 'Clube das ideias', detail: 'Crie um símbolo secreto', icon: <WandSparkles size={26} />, color: 'gold-card' },
  ],
};

function App() {
  const [age, setAge] = useState<Age>('5-6');
  const [soundOn, setSoundOn] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [completed, setCompleted] = useState<string[]>(['story']);
  const [heartCount, setHeartCount] = useState(12);
  const [toast, setToast] = useState('');
  const [callOpen, setCallOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const markDone = (id: string, title: string) => {
    setCompleted((current) => current.includes(id) ? current : [...current, id]);
    setToast(`${title} ficou guardado nas suas conquistas.`);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
    setMessageOpen(false);
    setToast('Sua mensagem chegou com muito carinho.');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className={`${largeText ? 'large-text' : ''}`}>
            <RoutedErrorBoundary>
              <AppShell
                age={age}
                setAge={setAge}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                largeText={largeText}
                setLargeText={setLargeText}
              >
                <Switch>
                  <Route path="/">
                    <HomePage age={age} completed={completed} markDone={markDone} />
                  </Route>
                  <Route path="/familia">
                    <FamilyPage
                      heartCount={heartCount}
                      setHeartCount={setHeartCount}
                      callOpen={callOpen}
                      setCallOpen={setCallOpen}
                      messageOpen={messageOpen}
                      setMessageOpen={setMessageOpen}
                      message={message}
                      setMessage={setMessage}
                      sendMessage={sendMessage}
                    />
                  </Route>
                  <Route path="/brincar">
                    <PlayPage gameOpen={gameOpen} setGameOpen={setGameOpen} gameScore={gameScore} setGameScore={setGameScore} />
                  </Route>
                  <Route path="/criar/historia/:id">
                    <StoryReaderRoute />
                  </Route>
                  <Route path="/criar">
                    <CreatePage age={age} completed={completed} markDone={markDone} />
                  </Route>
                  <Route path="/calma">
                    <CalmPage soundOn={soundOn} setSoundOn={setSoundOn} />
                  </Route>
                  <Route component={NotFound} />
                </Switch>
              </AppShell>
            </RoutedErrorBoundary>
            {toast && <div className="toast-message pop-in" role="status" data-testid="status-toast"><Sparkles size={18} />{toast}</div>}
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppShell({
  children,
  age,
  setAge,
  soundOn,
  setSoundOn,
  largeText,
  setLargeText,
}: {
  children: ReactNode;
  age: Age;
  setAge: (age: Age) => void;
  soundOn: boolean;
  setSoundOn: (value: boolean) => void;
  largeText: boolean;
  setLargeText: (value: boolean) => void;
}) {
  const [location] = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navItems = [
    { href: '/', label: 'Início', icon: <House size={23} /> },
    { href: '/familia', label: 'Família', icon: <UsersRound size={23} /> },
    { href: '/brincar', label: 'Brincar', icon: <Gamepad2 size={23} /> },
    { href: '/criar', label: 'Criar', icon: <Palette size={23} /> },
    { href: '/calma', label: 'Calma', icon: <Moon size={23} /> },
  ];

  return (
    <div className="amora-shell min-h-[100dvh]">
      <aside className="desktop-sidebar">
        <Link href="/" className="brand-lockup" data-testid="link-brand-home">
          <span className="brand-mark"><Heart size={22} fill="currentColor" /></span>
          <span><strong>amora</strong><small>um cantinho seu</small></span>
        </Link>
        <div className="sidebar-note">
          <span className="note-spark"><Sparkles size={15} /></span>
          <p>Um lugar para brincar, criar e sentir perto.</p>
        </div>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <p className="nav-kicker">Meu cantinho</p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${location === item.href ? 'is-active' : ''}`}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.icon}<span>{item.label}</span>{location === item.href && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="safe-box">
            <LockKeyhole size={18} />
            <div><strong>Espaço protegido</strong><span>Só para você e quem cuida.</span></div>
          </div>
          <div className="profile-chip">
            <span className="profile-avatar">L</span>
            <span><strong>Lia</strong><small>Meu perfil</small></span>
            <CircleUserRound size={18} />
          </div>
        </div>
      </aside>

      <main className="amora-content">
        <header className="topbar">
          <div className="mobile-brand">
            <Link href="/" className="brand-lockup" data-testid="link-mobile-brand-home">
              <span className="brand-mark"><Heart size={19} fill="currentColor" /></span><strong>amora</strong>
            </Link>
          </div>
          <div className="topbar-greeting"><span className="sun-dot" /><span>Olá, Lia</span><span className="topbar-separator">•</span><span className="topbar-soft">que bom ter você aqui</span></div>
          <div className="topbar-actions">
            <button className={`round-action ${soundOn ? 'selected' : ''}`} onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? 'Desligar som' : 'Ligar som'} data-testid="button-toggle-sound">
              {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>
            <button className={`round-action ${largeText ? 'selected' : ''}`} onClick={() => setLargeText(!largeText)} aria-label="Alternar texto grande" data-testid="button-toggle-large-text">
              <span className="type-icon">A</span>
            </button>
            <button className={`round-action settings-action ${settingsOpen ? 'selected' : ''}`} onClick={() => setSettingsOpen(!settingsOpen)} aria-label="Abrir configurações" data-testid="button-settings"><Settings2 size={19} /></button>
          </div>
          {settingsOpen && <div className="settings-popover pop-in" data-testid="panel-settings"><span className="eyebrow">AJUSTES RÁPIDOS</span><button onClick={() => setSoundOn(!soundOn)} data-testid="button-settings-sound">{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />} som <strong>{soundOn ? 'ligado' : 'desligado'}</strong></button><button onClick={() => setLargeText(!largeText)} data-testid="button-settings-text"><span className="type-icon">A</span> texto grande <strong>{largeText ? 'ligado' : 'desligado'}</strong></button></div>}
        </header>
        <div className="age-strip">
          <span className="age-label">Meu jeito de ver:</span>
          <div className="age-switch" role="group" aria-label="Escolha sua idade">
            {ages.map((option) => (
              <button
                key={option.key}
                className={`age-option ${option.key === age ? 'is-selected' : ''}`}
                onClick={() => setAge(option.key)}
                data-testid={`button-age-${option.key}`}
              >
                <span className={`age-bubble ${option.tone}`} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="page-wrap page-in">{children}</div>
      </main>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`mobile-nav-link ${location === item.href ? 'is-active' : ''}`} data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}>
            {item.icon}<span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function HomePage({
  age,
  completed,
  markDone,
}: {
  age: Age;
  completed: string[];
  markDone: (id: string, title: string) => void;
}) {
  const ageCopy: Record<Age, { title: string; intro: string; highlight: string }> = {
    '2-4': { title: 'O que vamos descobrir?', intro: 'Tem coisinhas macias esperando por você.', highlight: 'Hora de imaginar' },
    '5-6': { title: 'O que vamos inventar?', intro: 'Escolha um pedacinho gostoso do seu dia.', highlight: 'Uma ideia para hoje' },
    '7-8': { title: 'Qual vai ser a sua aventura?', intro: 'Seu cantinho, suas regras, suas ideias.', highlight: 'Desafio criativo' },
  };
  const copy = ageCopy[age];
  const activities = activitiesByAge[age];
  return (
    <section data-testid="page-home">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> UM CANTINHO PARA VOCÊ</span>
          <h1>Oi, Lia.<br /><em>Você chegou.</em></h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <Link href="/brincar" className="primary-button" data-testid="link-hero-play"><Play size={20} fill="currentColor" /> Vamos brincar</Link>
            <Link href="/calma" className="quiet-link" data-testid="link-hero-calm">Ou ficar bem quietinha <ChevronRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Ilustração de um céu acolhedor" data-testid="illustration-hero">
          <div className="cloud cloud-one" /><div className="cloud cloud-two" />
          <div className="moon-shape"><span /><small /></div>
          <div className="hero-star star-a"><Star size={18} fill="currentColor" /></div>
          <div className="hero-star star-b"><Star size={11} fill="currentColor" /></div>
          <div className="hero-planet"><span className="planet-ring" /><span className="planet-crater crater-one" /><span className="planet-crater crater-two" /></div>
          <div className="hero-swoosh" />
          <div className="art-label"><Heart size={14} fill="currentColor" /> um lugar seguro</div>
        </div>
      </div>

      <div className="section-heading-row">
        <div><span className="eyebrow"><span className="eyebrow-line" /> PARA AGORA</span><h2>{copy.title}</h2></div>
        <Link href="/criar" className="text-link" data-testid="link-see-all-create">Ver tudo <ChevronRight size={16} /></Link>
      </div>
      <div className="home-content-grid">
        <div className="activity-row">
          {activities.slice(0, 2).map((activity, index) => (
            <ActivityTile key={activity.id} activity={activity} index={index} done={completed.includes(activity.id)} onDone={() => markDone(activity.id, activity.title)} />
          ))}
        </div>
        <div className="family-peek">
          <div className="family-peek-top"><span className="eyebrow">PESSOAS QUE AMAM VOCÊ</span><span className="online-pill"><span /> online</span></div>
          <div className="family-portrait"><div className="portrait-sun" /><div className="portrait-face"><span className="portrait-hair" /><span className="portrait-eye eye-one" /><span className="portrait-eye eye-two" /><span className="portrait-smile" /></div></div>
          <div className="family-peek-copy"><strong>Vovó deixou um recado</strong><span>“Um beijo que cabe no bolso.”</span></div>
          <Link href="/familia" className="family-link" data-testid="link-family-peek">Ver recado <ChevronRight size={15} /></Link>
        </div>
      </div>

      <div className="today-ribbon">
        <div className="ribbon-icon"><Sparkles size={22} /></div>
        <div><span className="eyebrow">{copy.highlight}</span><strong>Junte 3 estrelas brincando.</strong></div>
        <div className="ribbon-stars"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} /><span>2 de 3</span></div>
        <Link href="/brincar" className="ribbon-button" data-testid="link-ribbon-game">Tentar agora <ChevronRight size={16} /></Link>
      </div>
    </section>
  );
}

function ActivityTile({ activity, index, done, onDone }: { activity: Activity; index: number; done: boolean; onDone: () => void }) {
  return (
    <button className={`activity-tile ${activity.color} ${index === 1 ? 'tile-offset' : ''}`} onClick={onDone} data-testid={`button-activity-${activity.id}`}>
      <span className="tile-icon">{activity.icon}</span>
      <span className="tile-copy"><strong>{activity.title}</strong><small>{activity.detail}</small></span>
      <span className={`tile-state ${done ? 'is-done' : ''}`}>{done ? <Check size={15} /> : <ChevronRight size={18} />}</span>
      {done && <span className="done-label">feito</span>}
    </button>
  );
}

function FamilyPage({
  heartCount,
  setHeartCount,
  callOpen,
  setCallOpen,
  messageOpen,
  setMessageOpen,
  message,
  setMessage,
  sendMessage,
}: {
  heartCount: number;
  setHeartCount: (value: number) => void;
  callOpen: boolean;
  setCallOpen: (value: boolean) => void;
  messageOpen: boolean;
  setMessageOpen: (value: boolean) => void;
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}) {
  return (
    <section className="subpage" data-testid="page-family">
      <div className="subpage-heading">
        <div><span className="eyebrow"><span className="eyebrow-line" /> GENTE QUERIDA</span><h1>Tem alguém<br /><em>pertinho de você.</em></h1><p>Mesmo quando não dá para estar junto, o carinho encontra um caminho.</p></div>
        <div className="heading-doodle"><Heart size={42} fill="currentColor" /><span /><span /></div>
      </div>
      <div className="family-grid">
        <div className="call-card paper-card">
          <div className="call-card-top"><span className="status-label"><span className="status-pulse" /> pronto para conversar</span><Video size={22} /></div>
          <div className="call-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="call-face"><CircleUserRound size={62} strokeWidth={1.3} /></div><div className="orbit-dot dot-top" /><div className="orbit-dot dot-side" /></div>
          <h2>Falar com a mamãe</h2><p>Ela está esperando para ver seu sorriso.</p>
          <button className="primary-button call-button" onClick={() => setCallOpen(true)} data-testid="button-start-call"><Video size={20} /> Começar chamada</button>
          {callOpen && <div className="call-overlay pop-in"><div className="mini-call-avatar"><CircleUserRound size={33} /></div><strong>Mamãe está aqui.</strong><span>Essa é uma chamada de faz de conta.</span><button onClick={() => setCallOpen(false)} className="secondary-button" data-testid="button-end-call">Encerrar por agora</button></div>}
        </div>
        <div className="message-card">
          <div className="message-decoration"><MessageSquareHeart size={28} /></div>
          <span className="eyebrow">CAIXINHA DE CARINHO</span><h2>Deixe um coração<br />para alguém.</h2><p>Um toque seu pode virar um abraço do outro lado.</p>
          <div className="heart-counter"><button onClick={() => setHeartCount(heartCount + 1)} aria-label="Enviar coração" data-testid="button-send-heart"><Heart size={34} fill="currentColor" /></button><span><strong>{heartCount}</strong> corações enviados</span></div>
          <button className="outline-button" onClick={() => setMessageOpen(!messageOpen)} data-testid="button-open-message"><MessageCircle size={18} /> {messageOpen ? 'Fechar bilhetinho' : 'Escrever bilhetinho'}</button>
          {messageOpen && <div className="message-composer pop-in"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Oi, estou pensando em você..." aria-label="Escreva um bilhetinho" data-testid="input-family-message" /><button onClick={sendMessage} aria-label="Enviar bilhetinho" data-testid="button-send-message"><Send size={18} /></button></div>}
        </div>
      </div>
      <div className="people-row"><div><span className="eyebrow">SEMPRE POR PERTO</span><h2>Olha quem passou por aqui</h2></div><div className="people-avatars"><span className="person-avatar person-coral">M</span><span className="person-avatar person-blue">V</span><span className="person-avatar person-gold">P</span><span className="person-avatar person-add"><Plus size={19} /></span></div></div>
    </section>
  );
}

function PlayPage({ gameOpen, setGameOpen, gameScore, setGameScore }: { gameOpen: boolean; setGameOpen: (value: boolean) => void; gameScore: number; setGameScore: (value: number) => void }) {
  const bubbles = ['a', 'b', 'c', 'd', 'e'];
  return (
    <section className="subpage" data-testid="page-play">
      <div className="subpage-heading play-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> HORA DE BRINCAR</span><h1>Uma brincadeira<br /><em>para cada vontade.</em></h1><p>Sem pressa. Você escolhe o ritmo.</p></div><div className="game-doodle"><Gamepad2 size={66} /><Star className="doodle-star" size={24} fill="currentColor" /></div></div>
      {!gameOpen ? (
        <div className="game-grid">
          <button className="game-card game-sky" onClick={() => { setGameOpen(true); setGameScore(0); }} data-testid="button-launch-bubble-game"><span className="game-illustration bubbles-illustration"><span /><span /><span /><span /></span><span className="eyebrow">TOQUE E DESCUBRA</span><h2>Estrelinhas no céu</h2><p>Encontre 3 brilhos escondidos.</p><span className="game-launch"><Play size={16} fill="currentColor" /> começar</span></button>
          <button className="game-card game-sand" onClick={() => setGameOpen(true)} data-testid="button-launch-memory-game"><span className="game-illustration memory-illustration"><span className="memory-shape" /><span className="memory-shape second" /></span><span className="eyebrow">JOGO TRANQUILO</span><h2>Memória de cores</h2><p>Observe, respire e encontre.</p><span className="game-launch"><Play size={16} fill="currentColor" /> começar</span></button>
          <div className="game-tip paper-card"><Sparkles size={22} /><div><strong>Uma dica da Amora</strong><p>Brincar também pode ser só olhar as formas e escolher uma favorita.</p></div></div>
        </div>
      ) : (
        <div className="active-game paper-card pop-in">
          <div className="active-game-head"><div><span className="eyebrow">ESTRELINHAS NO CÉU</span><h2>Toque nos brilhos!</h2></div><button className="icon-button" onClick={() => setGameOpen(false)} aria-label="Fechar jogo" data-testid="button-close-game"><RotateCcw size={19} /></button></div>
          <div className="game-board dot-grid">
            {bubbles.map((bubble, index) => <button key={bubble} className={`tap-star tap-star-${index}`} onClick={() => setGameScore(Math.min(3, gameScore + 1))} aria-label={`Brilho ${index + 1}`} data-testid={`button-game-star-${index}`}><Star size={index % 2 ? 28 : 37} fill="currentColor" /></button>)}
            <div className="game-moon"><Moon size={52} fill="currentColor" /></div>
          </div>
          <div className="game-progress"><span>{gameScore >= 3 ? 'Você encontrou todos!' : 'Encontre 3 estrelinhas'}</span><div><i className={gameScore > 0 ? 'filled' : ''} /><i className={gameScore > 1 ? 'filled' : ''} /><i className={gameScore > 2 ? 'filled' : ''} /></div>{gameScore >= 3 && <Check size={19} />}</div>
          {gameScore >= 3 && <div className="game-finished pop-in"><Sparkles size={19} /> Que céu bonito você fez!</div>}
        </div>
      )}
    </section>
  );
}

function CreatePage({ age, completed, markDone }: { age: Age; completed: string[]; markDone: (id: string, title: string) => void }) {
  const activities = useMemo(() => activitiesByAge[age], [age]);
  return (
    <section className="subpage" data-testid="page-create">
      <div className="subpage-heading create-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> SEU ATELIÊ</span><h1>Vamos fazer<br /><em>uma coisa linda.</em></h1><p>Você não precisa saber como. É só começar.</p></div><div className="pencil-doodle"><Palette size={57} /><span /><span /><span /></div></div>
      <div className="create-tabs"><span className="create-tab active">Para você</span><span className="create-tab">Meus feitos <small>{completed.length}</small></span></div>
      <div className="create-grid">{activities.map((activity, index) => <CreateCard key={`${activity.id}-${age}`} activity={activity} done={completed.includes(activity.id)} index={index} onDone={() => markDone(activity.id, activity.title)} />)}<button className="create-empty-card" onClick={() => markDone('surprise', 'Ideia surpresa')} data-testid="button-surprise-activity"><span><Plus size={25} /></span><strong>Me surpreenda</strong><small>uma ideia novinha</small></button></div>
      <div className="story-section-heading">
        <div><span className="eyebrow"><span className="eyebrow-line" /> HISTÓRIAS DA AMORA</span><h2>Um cantinho para ler</h2></div>
        <p>Escolha uma história e vá passando as páginas no seu ritmo.</p>
      </div>
      <div className="story-grid">
        {stories.map((story, index) => <StoryCard key={story.id} story={story} index={index} />)}
      </div>
      <div className="made-note"><Star size={20} fill="currentColor" /><span>Você já fez <strong>{completed.length} atividade{completed.length === 1 ? '' : 's'}</strong>. Cada criação tem seu brilho.</span></div>
    </section>
  );
}

function CreateCard({ activity, done, index, onDone }: { activity: Activity; done: boolean; index: number; onDone: () => void }) {
  return <button className={`create-card ${activity.color} create-card-${index}`} onClick={onDone} data-testid={`button-create-${activity.id}`}><div className="create-art">{activity.icon}<span className="art-stroke stroke-one" /><span className="art-stroke stroke-two" /></div><div className="create-card-copy"><span className="eyebrow">ATIVIDADE {index + 1}</span><h2>{activity.title}</h2><p>{activity.detail}</p><span className={`complete-chip ${done ? 'done' : ''}`}>{done ? <><Check size={14} /> guardado</> : <>começar <ChevronRight size={15} /></>}</span></div></button>;
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const ageLabel = story.ageRange ? storyAgeLabels[story.ageRange] : 'Faixa etária a definir';
  return (
    <article className={`story-card story-card-${index}`} data-testid={`card-story-${story.id}`}>
      <div className="story-card-art">
        {story.image ? <img src={story.image} alt={story.imageAlt} /> : <div className="story-card-placeholder"><BookOpen size={31} /><span>Imagem em breve</span></div>}
      </div>
      <div className="story-card-copy">
        <span className="story-card-kicker"><BookOpen size={14} /> HISTÓRIA</span>
        <h2>{story.title}</h2>
        <span className="story-card-age">{ageLabel}</span>
        <Link href={`/criar/historia/${story.id}`} className="story-open-link" data-testid={`link-open-story-${story.id}`}>
          abrir história <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function StoryReaderRoute() {
  const [location] = useLocation();
  const storyId = decodeURIComponent(location.split('/').pop() ?? '');
  const story = stories.find((item) => item.id === storyId);
  return story ? <StoryReaderPage story={story} /> : <NotFound />;
}

function CalmPage({ soundOn, setSoundOn }: { soundOn: boolean; setSoundOn: (value: boolean) => void }) {
  const [activeTool, setActiveTool] = useState('breath');
  const tools = [
    { id: 'breath', title: 'Respirar juntinho', detail: 'Uma bolha que sobe e desce', icon: <Wind size={24} /> },
    { id: 'story', title: 'História baixinha', detail: 'Palavras que fazem companhia', icon: <BookOpen size={24} /> },
    { id: 'music', title: 'Sons de ninar', detail: 'Escolha um som gostoso', icon: <Volume2 size={24} /> },
  ];
  return (
    <section className="subpage calm-page" data-testid="page-calm">
      <div className="subpage-heading calm-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> UM RESPIRO</span><h1>Você pode<br /><em>desacelerar.</em></h1><p>Este momento não precisa de nada. Só de você.</p></div><div className="calm-doodle"><Moon size={58} fill="currentColor" /><span className="calm-cloud" /></div></div>
      <div className="calm-layout">
        <div className="breath-card">
          <div className="breath-glow" /><div className="breath-orbit"><span /><span /><span /></div><div className="breath-core"><Wind size={31} /><strong>{activeTool === 'breath' ? 'entra... sai...' : 'bem devagar'}</strong></div>
          <div className="breath-copy"><span className="eyebrow">AGORA</span><h2>Vamos respirar<br />bem devagar?</h2><p>Siga a bolha. Ela sabe o caminho.</p></div>
          <button className="primary-button" onClick={() => setActiveTool('breath')} data-testid="button-start-breath"><Wind size={18} /> começar</button>
        </div>
        <div className="calm-tools"><div className="calm-tools-head"><span className="eyebrow">ESCOLHA UM JEITO</span><button className={`sound-toggle ${soundOn ? 'on' : ''}`} onClick={() => setSoundOn(!soundOn)} data-testid="button-calm-sound">{soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />} sons {soundOn ? 'ligados' : 'desligados'}</button></div>{tools.map((tool) => <button key={tool.id} className={`calm-tool ${activeTool === tool.id ? 'selected' : ''}`} onClick={() => setActiveTool(tool.id)} data-testid={`button-calm-tool-${tool.id}`}><span className="calm-tool-icon">{tool.icon}</span><span><strong>{tool.title}</strong><small>{tool.detail}</small></span><ChevronRight size={18} /></button>)}</div>
      </div>
      <div className="calm-footer"><Timer size={19} /><span>Não existe jeito certo de se sentir.</span><span className="calm-footer-line" /><Link href="/" data-testid="link-calm-home">voltar para o início <ChevronRight size={15} /></Link></div>
    </section>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

export default App;