const state = () => ({
  subscribed:false,
  isSubscribe:true,
  isLogIn: false,
  isLogOut:true,
  user:{
    user_name:'',
    id:'',
    token:''
  },
  users:[],
  loged:false,
  messages:[],
  popUp:{'status':false,'message':''},
  timestamp:'0'
})

const getters = {
  getUser: state => () => {
    return state.user
  },
  getTimestamp: state => () => {
    return state.timestamp
  }
}

const mutations = {
  setSubscribed(state,data) {
    state.subscribed=data,
    state.isSubscribe=true
    
  },
  logIn(state) {
    state.isSubscribe=false
    state.isLogIn= true
    state.isLogOut=false
  },
  logOut(state) {
    state.isSubscribe=true
    state.isLogIn= false
    state.isLogOut=true
    state.subscribed=false
  },
  subscribe(state) {
    state.isSubscribe=true
    state.isLogIn= false
    state.isLogOut=true
  },
  setUsers(state,data){
    state.users=data
  },
  setUser(state,data){
    state.user.user_name=data.user_name,
    state.user.id=data.id,
    state.user.token=data.token
  },
  isLoged(state,data){
    state.loged=data
  },
  setMessages(state,data){
    let messageTab=[]
    let j=0
    for (let i=data.length-1; i > 0; i--) {
      messageTab[j] = {
        'user':data[i].user_name,'message':data[i].content,
        'time':new Date(data[i].timestamp*1000).toLocaleTimeString("fr-FR"),
        'allTime':new Date(data[i].timestamp*1000).toLocaleString("fr-FR"),
        "cpt":i}
      j++
    }
    state.messages=messageTab
  },
  setToken(state,data){
    state.token=data
  },
  subscribing(state,data){
    state.subscribe=data
    console.log(data)
  },
  setPopUp(state,data){
    state.popUp.message=data.message,
    state.popUp.status=data.status
  },
  setTimestamp(state,data){
    state.timestamp=data
  }

}

const actions = {
  // Requêtte d'inscription
  fetchSubscribe({commit},data){
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${data.user}/${data.password}`)
    .then(res => {
      return res.json()
    })
    .then(res =>{
      if (res.result.status=="failure"){
        // Execution du pop erreur selon l'erreur
        commit('setPopUp',{'status':true,'message':"L'identifiant existe déjà"})
      }else{
        commit('setSubscribed', true)
        commit('logIn')
      }
    }).catch(()=>{
      // console.log('erreur Inscription');
    })
  },
  //Requette de connexion
  fetchLogIn({commit,dispatch},data){
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/login/${data.user}/${data.password}`)
    .then(res=>{
      return res.json()
    }).then(res=>{
      if(res.result.status=="done"){
        dispatch('fetchConnectedUsers',res.result.token)
        dispatch('fetchMessages',{'token':res.result.token,'timestamp':'0'})
        commit('setUser',res.result)
        commit('isLoged',true)

      }
      else{
        // Execution du pop erreur selon l'erreur
        commit('setPopUp',{'status':true,'message':"Identification erroné"}) 
      }
    }).catch(()=>{
      // console.log('erreur Connexion');
    })
  },
  //Récupération des utilisateurs connectés
  fetchConnectedUsers({commit},token){
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`)
    .then(res=>{
      return res.json()
    }).then(res=>{
      if(res.result.status=="done"){
        commit('setUsers',res.result.user)
      }
    }).catch(()=>{
      // console.log('erreur Utilisateurs connectés');
    })
  },
  //Récupération des messages
  fetchMessages({commit},data){
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${data.token}/${data.timestamp}`)
    .then(res=>{
      return res.json()
    }).then(res=>{
      if(res.result.status=="done"){
        commit('setMessages',res.result.talk)
      }
    }).catch(()=>{
      // console.log('erreur Messages');
    })
  },
  //Envoi de message
  postMessage({getters,dispatch},message){
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/say/${getters.getUser().token}/${getters.getUser().id}/${message}`)
    .then(res => {
      // console.log("data:",data);
      return res.json()
    })
    .then(() =>{
      dispatch('fetchMessages',{'token':getters.getUser().token,'timestamp':getters.getTimestamp()})
    })
    .catch(()=>{
      // console.log('erreur envoie de message');
    })
  },
  //Déconnexion
  fetchLogOut({commit}){
    commit('logOut')
    commit('isLoged',false)
    // fetch(`http://greenvelvet.alwaysdata.net/kwick/logout/${getters.getUser().token}/${getters.getUser().id}`)
    // .then(res=>{
    //   console.log(res);
    
    // })
    // .catch(()=>{
    //   // console.log('error users');
    // })
  },
  //Recupération des messages selon la période sélectionnée
  fetchTimeMessages({commit,dispatch,getters},data){
    let time=data!='0'? Math.round((new Date().getTime()-data*1000)/1000):'0'
    commit('setTimestamp',time)
    dispatch('fetchMessages',{'token':getters.getUser().token,'timestamp':time})
  }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }