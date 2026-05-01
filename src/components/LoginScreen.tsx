import React, { useState } from 'react';
import { useWindows } from '../context/WindowContext';
import { User, ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginScreen() {
  const { login, register, loginWithGoogle, language } = useWindows();

  const t = ({
    pt: { welcome: 'Bem-vindo de volta', createAccount: 'Criar conta', email: 'E-mail', password: 'Senha', signIn: 'Entrar', register: 'Registrar', alreadyAccount: 'Já tem uma conta? Entrar', noAccount: 'Não tem uma conta? Registrar', google: 'Entrar com Google' },
    en: { welcome: 'Welcome Back', createAccount: 'Create Account', email: 'Email', password: 'Password', signIn: 'Sign In', register: 'Register', alreadyAccount: 'Already have an account? Login', noAccount: "Don't have an account? Register", google: 'Sign in with Google' },
    es: { welcome: 'Bienvenido de nuevo', createAccount: 'Crear cuenta', email: 'Correo electrónico', password: 'Contraseña', signIn: 'Iniciar sesión', register: 'Registrarse', alreadyAccount: '¿Ya tienes una cuenta? Iniciar sesión', noAccount: '¿No tienes una cuenta? Registrarse', google: 'Iniciar sesión con Google' },
    fr: { welcome: 'Bon retour', createAccount: 'Créer un compte', email: 'E-mail', password: 'Mot de passe', signIn: 'Se connecter', register: 'S\'inscrire', alreadyAccount: 'Déjà un compte ? Connexion', noAccount: 'Pas de compte ? S\'inscrire', google: 'Se connecter com Google' },
    it: { welcome: 'Bentornato', createAccount: 'Crea account', email: 'Email', password: 'Password', signIn: 'Accedi', register: 'Registrati', alreadyAccount: 'Hai già un account? Accedi', noAccount: 'Non hai un account? Registrati', google: 'Accedi con Google' },
    de: { welcome: 'Willkommen zurück', createAccount: 'Konto erstellen', email: 'E-Mail', password: 'Passwort', signIn: 'Anmelden', register: 'Registrieren', alreadyAccount: 'Haben Sie bereits ein Konto? Anmelden', noAccount: 'Haben Sie kein Konto? Registrieren', google: 'Mit Google anmelden' },
    ru: { welcome: 'С возвращением', createAccount: 'Создать аккаунт', email: 'Эл. почта', password: 'Пароль', signIn: 'Войти', register: 'Регистрация', alreadyAccount: 'Уже есть аккаунт? Войти', noAccount: 'Нет аккаунта? Регистрация', google: 'Войти через Google' },
    ja: { welcome: 'おかえりなさい', createAccount: 'アカウントを作成', email: 'メールアドレス', password: 'パスワード', signIn: 'サインイン', register: '登録', alreadyAccount: 'すでにアカウントをお持ちですか？サインイン', noAccount: 'アカウントをお持ちではありませんか？登録', google: 'Google でサインイン' },
    ko: { welcome: '다시 오신 것을 환영합니다', createAccount: '계정 만들기', email: '이메일', password: '비밀번호', signIn: '로그인', register: '등록', alreadyAccount: '이미 계정이 있으신가요? 로그인', noAccount: '계정이 없으신가요? 등록', google: 'Google로 로그인' },
    zh: { welcome: '欢迎回来', createAccount: '创建账户', email: '电子邮件', password: '密码', signIn: '登录', register: '注册', alreadyAccount: '已有账户？登录', noAccount: '没有账户？注册', google: '使用 Google 登录' },
    ar: { welcome: 'مرحباً بعودتك', createAccount: 'إنشاء حساب', email: 'البريد الإلكتروني', password: 'كلمة المرور', signIn: 'تسجيل الدخول', register: 'تسجيل', alreadyAccount: 'لديك حساب بالفعل؟ تسجيل الدخول', noAccount: 'ليس لديك حساب؟ تسجيل', google: 'تسجيل الدخول باستخدام جوجل' },
    nl: { welcome: 'Welkom terug', createAccount: 'Account aanmaken', email: 'E-mail', password: 'Wachtwoord', signIn: 'Inloggen', register: 'Registreren', alreadyAccount: 'Heb je al een account? Inloggen', noAccount: 'Heb je geen account? Registreren', google: 'Inloggen met Google' },
    pl: { welcome: 'Witaj ponownie', createAccount: 'Utwórz konto', email: 'E-mail', password: 'Hasło', signIn: 'Zaloguj się', register: 'Zarejestruj się', alreadyAccount: 'Masz już konto? Zaloguj się', noAccount: 'Nie masz konta? Zarejestruj się', google: 'Zaloguj się przez Google' },
    tr: { welcome: 'Tekrar hoş geldiniz', createAccount: 'Hesap Oluştur', email: 'E-posta', password: 'Şifre', signIn: 'Giriş Yap', register: 'Kayıt Ol', alreadyAccount: 'Zaten bir hesabınız var mı? Giriş Yap', noAccount: 'Hesabınız yok mu? Kayıt Ol', google: 'Google ile giriş yap' },
    hi: { welcome: 'वापसी पर स्वागत है', createAccount: 'खाता बनाएँ', email: 'ईमेल', password: 'पासवर्ड', signIn: 'साइन इन करें', register: 'रजिस्टर करें', alreadyAccount: 'पहले से ही एक खाता है? लॉगिन करें', noAccount: 'खाता नहीं है? रजिस्टर करें', google: 'Google के साथ साइन इन करें' },
    vi: { welcome: 'Chào mừng quay trở lại', createAccount: 'Tạo tài khoản', email: 'Email', password: 'Mật khẩu', signIn: 'Đăng nhập', register: 'Đăng ký', alreadyAccount: 'Đã có tài khoản? Đăng nhập', noAccount: 'Chưa có tài khoản? Đăng ký', google: 'Đăng nhập với Google' },
    th: { welcome: 'ยินดีต้อนรับกลับมา', createAccount: 'สร้างบัญชี', email: 'อีเมล', password: 'รหัสผ่าน', signIn: 'เข้าสู่ระบบ', register: 'ลงทะเบียน', alreadyAccount: 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ', noAccount: 'ยังไม่มีบัญชี? ลงทะเบียน', google: 'ลงทะเบียนด้วย Google' }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? { welcome: 'Bem-vindo de volta', createAccount: 'Criar conta', email: 'E-mail', password: 'Senha', signIn: 'Entrar', register: 'Registrar', alreadyAccount: 'Já tem uma conta? Entrar', noAccount: 'Não tem uma conta? Registrar', google: 'Entrar com Google' } : language.startsWith('es') ? { welcome: 'Bienvenido de nuevo', createAccount: 'Criar conta', email: 'Correo electrónico', password: 'Contraseña', signIn: 'Iniciar sesión', register: 'Registrarse', alreadyAccount: '¿Ya tienes una cuenta? Iniciar sesión', noAccount: '¿No tienes una cuenta? Registrarse', google: 'Iniciar sesión con Google' } : language.startsWith('fr') ? { welcome: 'Bon retour', createAccount: 'Créer un compte', email: 'E-mail', password: 'Mot de passe', signIn: 'Se connecter', register: 'S\'inscrire', alreadyAccount: 'Déjà un compte ? Connexion', noAccount: 'Pas de compte ? S\'inscrire', google: 'Se connecter com Google' } : language.startsWith('zh') ? { welcome: '欢迎回来', createAccount: '创建账户', email: '电子邮件', password: '密码', signIn: '登录', register: '注册', alreadyAccount: '已有账户？登录', noAccount: '没有账户？注册', google: '使用 Google 登录' } : { welcome: 'Welcome Back', createAccount: 'Create Account', email: 'Email', password: 'Password', signIn: 'Sign In', register: 'Register', alreadyAccount: 'Already have an account? Login', noAccount: "Don't have an account? Register", google: 'Sign in with Google' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      if (result.error?.includes('auth/unauthorized-domain')) {
        setError('Domain not authorized. Please add this domain to Firebase Console > Auth > Settings > Authorized Domains.');
      } else if (result.error?.includes('auth/operation-not-allowed')) {
        setError('Google Sign-in is not enabled in Firebase Console. Please enable it in Authentication > Sign-in method.');
      } else if (result.error?.includes('auth/popup-closed-by-user')) {
        setError('Login popup was closed before completion.');
      } else if (result.error?.includes('auth/popup-blocked')) {
        setError('Popup blocked by browser. Please allow popups for this site.');
      } else {
        setError(result.error || 'Google Login failed');
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isRegistering) {
      const result = await register(email, password);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          setIsRegistering(false);
          setSuccess(false);
          setPassword('');
        }, 3000);
      } else {
        setError(result.error || 'Registration failed');
      }
    } else {
      const result = await login(email, password);
      if (!result.success) {
        if (result.error?.includes('auth/operation-not-allowed')) {
          setError('Email/Password login is not enabled in Firebase Console. Please use Google Login or enable it.');
        } else if (result.error?.includes('auth/invalid-credential') || result.error?.includes('auth/user-not-found')) {
          setError('Invalid email or password. If you don\'t have an account, please register first.');
        } else {
          setError(result.error || 'Login failed');
        }
      }
    }
    setLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[9998] bg-cover bg-center flex flex-col items-center justify-center select-none"
      style={{ backgroundImage: 'url("https://raw.githubusercontent.com/blueedgetechno/windows11/master/public/img/wallpaper/default/img0.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500 w-full max-w-md px-4">
        <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center shadow-2xl overflow-hidden">
          <User size={64} className="text-white" />
        </div>
        
        <h1 className="text-4xl font-light text-white text-shadow">
          {isRegistering ? t.createAccount : t.welcome}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="relative w-full group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              required
              className="w-full bg-black/20 backdrop-blur-md border border-white/20 rounded-md py-2.5 pl-10 pr-4 text-white outline-none focus:bg-black/40 focus:border-blue-400 transition-all placeholder:text-white/50"
            />
          </div>

          <div className="relative w-full group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password}
              required
              className="w-full bg-black/20 backdrop-blur-md border border-white/20 rounded-md py-2.5 pl-10 pr-10 text-white outline-none focus:bg-black/40 focus:border-blue-400 transition-all placeholder:text-white/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {error && (
            <div className="w-full flex flex-col gap-2">
              <p className="text-red-400 text-xs font-medium text-center bg-red-900/20 p-2 rounded border border-red-500/30 w-full">
                {error}
              </p>
              {error.includes('Domain not authorized') && (
                <div className="bg-black/40 p-3 rounded border border-white/10 text-[10px] text-white/60">
                  <p className="font-bold text-white/80 mb-1 uppercase">Debug Info:</p>
                  <p>Copy this exact domain to Firebase:</p>
                  <code className="block bg-black/60 p-1 mt-1 rounded text-blue-300 select-all">
                    {window.location.hostname}
                  </code>
                  <p className="mt-2 text-yellow-400/80">
                    Tip: Try opening the app in a <strong>New Tab</strong> (button in top right) if the error persists.
                  </p>
                </div>
              )}
            </div>
          )}

          {success && (
            <p className="text-green-400 text-xs font-medium text-center bg-green-900/20 p-2 rounded border border-green-500/30 w-full">
              Account registered! Verification email sent.
            </p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/30 rounded-md py-2.5 flex items-center justify-center text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                {isRegistering ? t.register : t.signIn} <ArrowRight size={18} />
              </span>
            )}
          </button>

          <div className="flex items-center gap-4 w-full my-2">
            <div className="h-[1px] bg-white/20 flex-1" />
            <span className="text-white/40 text-xs uppercase font-bold">or</span>
            <div className="h-[1px] bg-white/20 flex-1" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 rounded-md py-2.5 flex items-center justify-center gap-3 text-gray-900 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            {t.google}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
              setSuccess(false);
            }}
            className="text-white/70 hover:text-white text-sm transition-colors mt-2"
          >
            {isRegistering ? t.alreadyAccount : t.noAccount}
          </button>
        </form>
      </div>
      
      <div className="absolute bottom-8 right-8 flex gap-6 text-white/80">
        <div className="flex flex-col items-end">
          <span className="text-5xl font-light">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="text-lg font-light">{new Date().toLocaleDateString(language, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
