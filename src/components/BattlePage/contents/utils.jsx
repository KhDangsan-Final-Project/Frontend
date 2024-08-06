export const getRankImageClass = (matchWin, styles) => {
    if (matchWin >= 0 && matchWin <= 10) {
      return styles.rankImage1;
    } else if (matchWin > 10 && matchWin <= 20) {
      return styles.rankImage2;
    } else if (matchWin > 20 && matchWin <= 30) {
      return styles.rankImage3;
    } else if (matchWin > 30 && matchWin <= 40) {
      return styles.rankImage4;
    } else if (matchWin > 40 && matchWin <= 50) {
      return styles.rankImage5;
    } else if (matchWin > 50) {
      return styles.rankImage6;
    } else {
      return styles.rankImageDefault; // 기본 클래스
    }
  };
  
  export const getProfileImageClass = (profile, styles) => {
    switch (profile) {
      case '/img/user/userImage1.png':
        return styles.userImage1;
      case '/img/user/userImage2.png':
        return styles.userImage2;
      case '/img/user/userImage3.png':
        return styles.userImage3;
      case '/img/user/userImage4.png':
        return styles.userImage4;
      case '/img/user/userImage5.png':
        return styles.userImage5;
      case '/img/user/userImage6.png':
        return styles.userImage6;
      default:
        return styles.userImageDefault; // 기본 클래스
    }
  };
  
