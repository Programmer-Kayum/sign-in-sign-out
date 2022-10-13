import './App.css';
import  { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase.init';
import { useState } from 'react';




const auth= getAuth(app)


function App() {


const [user,setUser]=useState([])

const googleProvider= new GoogleAuthProvider();
const gitHubProvider= new GithubAuthProvider();



const handleGoogleSignIn=()=>{
  signInWithPopup(auth, googleProvider)
.then((result)=>{
  const user= result.user;
  setUser(user)
  console.log(user);
})
.catch((error)=>{
  console.error('error:', error);
})
}

const handleGoogleSigOut=()=>{
  signOut(auth).then(() => {
   setUser([])
  }).catch((error) => {
    setUser([])
  });
  
}


const handleGithubSignIn=()=>{
  signInWithPopup(auth, gitHubProvider)
  .then((result) => {
    const user = result.user;
    setUser(user)
    console.log(user);
  })
  .catch((error) => {
    console.error('error',error);
  });

}

const handleGitHubSigOut=()=>{
  const auth = getAuth();
signOut(auth).then(() => {
  setUser([])
}).catch((error) => {
  setUser([])
});
}



  return (
    <div className="App">

      {user.uid ? <div>
        <button onClick={handleGoogleSigOut}> Sign Out Google</button>
        <button onClick={handleGitHubSigOut}> Sign Out GitHub</button>
      </div> :
      <div>
        <button onClick={handleGoogleSignIn}> Sign In Google</button>
        <button onClick={handleGithubSignIn}> Sign In GitHub</button>
      </div> }

      {user.uid && <div>
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;
