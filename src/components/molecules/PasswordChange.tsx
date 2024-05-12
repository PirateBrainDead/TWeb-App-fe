import { useTranslations } from 'next-intl';
import PasswordForm from './PasswordForm';

export default function PasswordChange() {
  const t = useTranslations('Settings');
  const translations = {
    settingsOldPasswordLabel: t('settingsOldPasswordLabel'),
    settingsNewPasswordLabel: t('settingsNewPasswordLabel'),
    settingsNewConfirmPasswordLabel: t('settingsNewConfirmPasswordLabel'),
    buttonSaveChanges: t('buttonSaveChanges'),
    passwordChanged: t('passwordChanged'),
    // This for handling error from backend
    'user-password-incorrect': t('user-password-incorrect'),
    'newPassword must be longer than or equal to 8 characters': t(
      'newPassword must be longer than or equal to 8 characters'
    ),
    'newRepeatPassword and newPassword does not match': t(
      'newRepeatPassword and newPassword does not match'
    ),
    'newRepeatPassword must be longer than or equal to 8 characters': t(
      'newRepeatPassword must be longer than or equal to 8 characters'
    ),
    'String must contain at least 8 character(s)': t(
      'String must contain at least 8 character(s)'
    ),
  };
  return (
    <div className='w-1/2 text-white '>
      <PasswordForm translations={translations} />
    </div>
  );
}
