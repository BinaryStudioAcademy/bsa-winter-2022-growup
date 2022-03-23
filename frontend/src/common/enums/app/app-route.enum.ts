enum AppRoute {
  LOGIN = '/login',
  SIGN_UP = '/signup',
  ORKS = '/ork',
  PAGES = '/pages',
  PROFILE_SETTINGS = '/profile-settings',
  PROFILE_SETTINGS_STEP = '/profile-settings/*',
  HOME = '/',
  PROFILE = '/profile',
  CAREER_PATH = '/career-path',
  OKR = '/okr',
  OPPORTUNITIES = '/opportunities',
  MENTEE_PROFILES = '/mentee',
  EXPLORE = '/explore',
  SKILLS = '/profile/skills',
  VERIFICATION = '/registration-complete/:token',
  ANY = '/*',
}

export { AppRoute };
