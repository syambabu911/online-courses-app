import React from 'react';
import '../cssfolder/Share.css';

const shareOptions = [
  { name: 'WhatsApp', icon: '/assets/whatsapp.png', url: 'https://web.whatsapp.com/send?text=Check out this link: https://www.youtube.com/', appLink: 'https://play.google.com/store/apps/details?id=com.whatsapp' },
  { name: 'Chrome', icon: '/assets/Chrome.png', url: 'https://www.google.com/chrome/', appLink: 'https://play.google.com/store/apps/details?id=com.android.chrome' },
  { name: 'Instagram', icon: '/assets/Instagram.png', url: 'https://www.instagram.com/', appLink: 'https://play.google.com/store/apps/details?id=com.instagram.android' },
  { name: 'Gmail', icon: '/assets/gmail.png', url: 'mailto:?subject=Check out this link&body=https://www.youtube.com/', appLink: 'https://play.google.com/store/apps/details?id=com.google.android.gm' },
  { name: 'Telegram', icon: '/assets/Telegram.png', url: 'https://telegram.me/share/url?url=https://www.youtube.com/&text=Check out this link', appLink: 'https://play.google.com/store/apps/details?id=org.telegram.messenger' },
  { name: 'Messaging', icon: '/assets/messaging.png', url: 'sms:?body=Check out this link: https://www.youtube.com/', appLink: 'https://play.google.com/store/apps/details?id=com.google.android.apps.messaging' },
  { name: 'Save to Drive', icon: '/assets/drive.png', url: 'https://drive.google.com/', appLink: 'https://play.google.com/store/apps/details?id=com.google.android.apps.docs' },
  { name: 'Bluetooth', icon: '/assets/bluetooth.png', url: 'bluetooth:', appLink: 'https://play.google.com/store/apps/details?id=com.android.bluetooth' }
];

const Share = () => {
  const handleShare = (url, appLink) => {
    // Try to open the app
    window.open(url, '_blank');
    // If the app is not installed, redirect to app store link
    setTimeout(() => {
      window.open(appLink, '_blank');
    }, 2000); // Adjust the delay as needed
  };

  return (
    <center>
          <div className="share-container">
      <h2>Share this App</h2>
      <div className="share-options">
        {shareOptions.map(option => (
          <div key={option.name} className="share-option" onClick={() => handleShare(option.url, option.appLink)}>
            <img src={option.icon} alt={option.name} />
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
    </center>

  );
};

export default Share;
