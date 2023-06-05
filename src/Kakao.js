import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import {
  signInWithPopup,
  signInWithCredential,
  OAuthProvider,
  getAuth,
} from "firebase/auth";
import { auth } from "./config";

const restkey = "본인의 REST API 키";

const Kakao = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(restkey);
    console.log(window.Kakao.isInitialized());
  }

  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (!window.location.search) return;
    getKakaoToken(code);
  }, []);

  useEffect(() => {
    if (idToken !== null) {
      console.log(idToken);
      const provider = new OAuthProvider("oidc.kakao");
      const credential = provider.credential({
        idToken: idToken,
      });

      signInWithCredential(auth, credential)
        .then((result) => {
          const credential = OAuthProvider.credentialFromResult(result);
          const acToken = credential.accessToken;
          const idToken = credential.idToken;
          // console.log(acToken, idToken);
        })
        .catch((error) => {
          // Handle error.
          console.log(error);
        });
      getKakaoUserInfo(accessToken);
      //   customToken(accessToken);
    }
  }, [idToken]);

  const navigate = useNavigate();

  const params = new URL(document.location.toString()).searchParams;

  const code = params.get("code");

  const getKakaoToken = async (code) => {
    await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${restkey}&redirect_uri=${window.location.origin}/callback/kakaotalk&code=${code}`,
    })
      .then((res) => res.json())
      .then((data) => {
        // OIDC 사용하는 경우 id_token으로 접근해야 한다.
        if (data.id_token) {
          setIdToken(data.id_token);
        } else {
          navigate("/");
        }
        if (data.access_token) {
          setAccessToken(data.access_token);
          window.Kakao.Auth.setAccessToken(data.access_token);
        }
        // 기존은 access_token임.
        // if (data.access_token) {
        //   console.log(data.access_token);
        //   setToken(data.access_token);
        //   window.Kakao.Auth.setAccessToken(data.access_token);
        //   return data;
        // } else {
        //   navigate("/");
        // }
      });
  };

  const getKakaoUserInfo = async (data) => {
    await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${data}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  };

  //   const customToken = async (token) => {
  //     await axios
  //       .get(`/api/auth/kakao/${token}`)
  //       .then((r) => {
  //         console.log(r.data);

  //         // 커스텀 토큰으로 로그인
  //         auth()
  //           .signInWithCustomToken(r.data)
  //           .then((userCredential) => {
  //             const user = userCredential.user;
  //             console.log(user);
  //           })
  //           .catch((error) => {
  //             const errorCode = error.code;
  //             const errorMessage = error.message;
  //             console.log(errorCode);
  //             console.log(errorMessage);
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };

  // const provider = new OAuthProvider("oidc.kakao");
  // signInWithPopup(auth, provider)
  //   .then((res) => {
  //     const credential = OAuthProvider.credentialFromResult(res);
  //     const accesstoken = credential.accessToken;
  //     const idToken = credential.idToken;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return <div>{code}</div>;
};

export default Kakao;
