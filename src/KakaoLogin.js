const restkey = "본인의 REST API 키";

const KakaoLogin = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(restkey);
    console.log(window.Kakao.isInitialized());
  }

  const handleKakaoSign = () => {
    const redirectUri = `${window.location.origin}/callback/kakaotalk`;

    const scope = [
      "profile_nickname",
      "profile_image",
      "account_email",
      "gender",
      "age_range",
      "birthday",
      "friends",
      "openid",
    ].join(",");

    window.Kakao.Auth.authorize({
      redirectUri,
      scope,
    });
  };

  return <button onClick={handleKakaoSign}>Kakao 로그인</button>;
};

export default KakaoLogin;
