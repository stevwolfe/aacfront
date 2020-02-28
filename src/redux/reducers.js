// TOP-LEVEL REDUCERS

export function isLoggedIn(state = false, action) {
  switch (action.type) {
    case "RECEIVE_CURRENT_USER":
      return true;
    default:
      return state;
  }
}

export function currentUser(state = { loading: true }, action) {
  switch (action.type) {
    case "NO_TOKEN":
      return { loading: false };
    case "CHANGE_ONLINE_STATUS":
      return {...state, onlineStatus: !state.onlineStatus}
    case 'UPDATE_AGE':
      return {...state, age: action.payload}
    case "REQUEST_CURRENT_USER":
      return { loading: true };
    case "UPDATE_EMAIL":
      return {...state, email: action.payload}
    case "UNFILTER_PHOTOS":
      return {...state, lookingPhotosMember: false}
    case "FILTER_PHOTOS":
      return {...state, lookingPhotosMember: true}
    case "UNFILTER_ONLINE":
      return {...state, lookingOnlineMember: false}
    case "FILTER_ONLINE":
      return {...state, lookingOnlineMember: true}
    case "UPDATE_DISTANCE":
      return {...state, maxRadius: action.payload}
    case "REPLACE_PHOTO":
      return {...state, photo: action.payload.cropped_url}
    case "RECEIVE_CURRENT_USER":
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return {
        id: action.payload.id,
        username: action.payload.username,
        // firstName: action.payload.firstName,
        // lastName: action.payload.lastName,
        loading: false,
        member: action.payload.member,
        minAge: action.payload.minAge,
        maxAge: action.payload.maxAge,
        photo: action.payload.photo,
        lastLogin: action.payload.lastLogin,
        email: action.payload.email,
        age: action.payload.age,
        remainingMessages: action.payload.remainingMessages,
        onlineStatus: action.payload.onlineStatus,
        lookingOnlineMember: action.payload.lookingOnlineMember,
        lookingPhotosMember: action.payload.lookingPhotosMember,        
        maxRadius: action.payload.maxRadius,
        confirmedAccount: action.payload.confirmedUser

      };
    case "UPDATE_COUNTER":
      return {...state, remainingMessages: (state.remainingMessages - 1) };
    case "UPDATE_MIN_AGE":
        return {...state, minAge: action.payload.minAge}
    case "UPDATE_MAX_AGE":
      return {...state, maxAge: action.payload.maxAge}
    case "CONFIRM_ACCOUNT":
      return {...state, confirmedAccount: true}
    case "ERROR_CONFIRM_ACCOUNT":
      return {...state, errorConfirmAccount: "This activation code is not valid"}    
    default:
      return state;
  }
}

export function activeConversationId(state = null, action) {
  switch (action.type) {
    case "RECEIVE_CONVERSATIONS":
      // eslint-disable-next-line
      const sortedConvos = action.payload.conversations.sort((a, b) => {
        if (a.latest_message && b.latest_message) {
          return (
            new Date(b.latest_message.created_at) -
            new Date(a.latest_message.created_at)
          );
        } else if (!a.latest_message) {
          return -1;
        } else if (!b.latest_message) {
          return 1;
        }
      });
      if (sortedConvos.length) {
        return sortedConvos[0].id;
      } else {
        return state;
      }
    case "RECEIVE_CONVERSATIONS_PVT":
      // eslint-disable-next-line
      const sortedConvosPvt = action.payload.conversations.sort((a, b) => {
        if (a.latest_message && b.latest_message) {
          return (
            new Date(b.latest_message.created_at) -
            new Date(a.latest_message.created_at)
          );
        } else if (!a.latest_message) {
          return -1;
        } else if (!b.latest_message) {
          return 1;
        }
      });
      if (sortedConvosPvt.length) {
        return sortedConvosPvt[0].id;
      } else {
        return state;
      }
    case "RECEIVE_ADDED_CONVERSATION":
      if (!action.payload.latest_message) {
        return action.payload.id;
      }
      return state;
    case "CHANGE_ACTIVE_CONVERSATION":
      if (action.payload.convo.id) {
        return action.payload.convo.id;
      }
      return state
    case "LEAVE_CONVERSATION":
      if (state === action.payload.conversation_id) {
        return null;
      }
      return state;
    default:
      return state;
  }
}

export function conversations(state = [], action) {
  switch (action.type) {
    case "ADD_CONVERSATION":
      return [...state, { id: action.payload.id, title: action.payload.title, messages: action.payload.messages, photo:  action.payload.messages}];
    case "EDIT_CONVERSATION_TITLE":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, title: action.payload.title, latest_message: action.payload.message, messages: messages(oldConvo.messages, action) };
      });
    case "RECEIVE_ADDED_MESSAGE":
      return editConversation(state, action, (oldConvo, action) => {
        if (oldConvo.messages.length) {
          return { ...oldConvo, latest_message: action.payload, messages: messages(oldConvo.messages, action) };
        }
        return { ...oldConvo, latest_message: action.payload };
      });
    case "RECEIVE_ADDED_MESSAGE_MODAL":
      state = [...state, action.payload]
      return state
    case "PUSH_INITIAL_MESSAGE":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, latest_message: action.payload.message, messages: messages(oldConvo.messages, action) };
      });
    case "RECEIVE_ADDED_USERS":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, users: oldConvo.users.concat(action.payload.users) };
      });
    case "RECEIVE_CONVERSATIONS":
      return action.payload.conversations.map(conversation => ({
        ...conversation,
        messages: [],
        loading: false,
        new: false
      }));
    case "SEND_ADDED_MESSAGE":
      state = [...state, {id: action.paylad}]
    case "RECEIVE_CONVERSATIONS_PVT":

      let arr = action.payload.conversations.map(conversation => ({
        ...conversation,
        messages: [],
        loading: false,
        new: false
      }));
      arr.map(convo => state.push(convo))
      function removeDuplicates(array, key) {
          return array.filter((obj, index, self) =>
              index === self.findIndex((el) => (
                  el[key] === obj[key]
              ))
          )
      }
      state = removeDuplicates(state, 'id')
      return state
    case "RESET_CONVERSATIONS_PVT":
      return state = []
    case "CLEAN_DOUBLONS": 
      return state = action.payload
    case "REQUEST_MESSAGES":
      return editConversation(state, action, (oldConvo, action) => {

        return { ...oldConvo, loading: true, new: false };
      });
    case "RECEIVE_MESSAGES":
        return editConversation(state, action, (oldConvo, action) => {
          return { ...oldConvo, loading: false, messages: messages(oldConvo.messages, action)};
        });

    case "RECEIVE_VIEW_CONVERSATION":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, last_viewed: action.payload.last_viewed, new: false };
      });
    case "RECEIVE_ADDED_CONVERSATION":
      let myMessages = [];
      if (action.payload.messages) {
        myMessages = action.payload.messages;
      }

      if (!myMessages.length) {
        const newConversation = { ...action.payload, messages: [action.payload.latest_message.text], loading: false };

        return [...state, newConversation]
      } else {
        const newConversation = { ...action.payload, messages: myMessages, loading: false };
        return [...state, newConversation];
      }
    case "RESET_CONVERSATIONS":
      return []
    case "LEAVE_CONVERSATION":
      return [...state].filter(conv => conv.id !== action.payload.conversation_id);
    case "RECEIVE_LEFT_CONVERSATION":
      return editConversation(state, action, (oldConvo, action) => {
        return { ...oldConvo, users: oldConvo.users.filter(u => u.id !== action.payload.user_id), latest_message: action.payload.message, messages: messages(oldConvo.messages, action) };
      });
    default:
      return state;
  }
}

export function conversationsLoading(state = false, action) {
  switch (action.type) {
    case "REQUEST_CONVERSATIONS":
      return true;
    case "RECEIVE_CONVERSATIONS":
      return false;
    case "RECEIVE_CONVERSATIONS_PVT":
      return false;
    default:
      return state;
  }
}

export function showNewConversationModal(state = false, action) {
  switch (action.type) {
    case "SHOW_NEW_CONVERSATION_MODAL":
      return true;
    case "HIDE_NEW_CONVERSATION_MODAL":
      return false;
    default:
      return state;
  }
}

export function showUserProfileModal(state = false, action) {
  switch (action.type) {
    case "SHOW_USER_PROFILE_MODAL":
      return true;
    case "HIDE_USER_PROFILE_MODAL":
      return false;
    default:
      return state;
  }
}

export function showEditConversationModal(
  state = { isShown: false, conversationId: null },
  action
) {
  switch (action.type) {
    case "SHOW_EDIT_CONVERSATION_MODAL":
      return { isShown: true, conversationId: action.payload };
    case "HIDE_EDIT_CONVERSATION_MODAL":
      return { isShown: false, conversationId: null };
    default:
      return state;
  }
}

//PHOTO

export function loaderAddingPhoto(state = {}, action ) {
  switch (action.type) {
    case "SET_LOADER":
      return state = {loading: true}
    case "UNSET_LOADER":
      return state = {loading: true}
    default:
      return state;
  }
}

export function showPublicPhotos(state = [], action) {

  switch (action.type) {
    case "GET_PHOTOS":
       return [...state, ...action.payload]
    case "ADD_PHOTO":
      return [...state, {id: action.payload.json.id, url: action.payload.json.url, private:action.payload.json.private, user_id:action.payload.json.user_id }]
    case "RESET_PHOTOS":
      return state = []
    case "REPLACE_WITH_CROPPED":
      state = state.filter(photo => photo.id != action.payload.id)
      state.push(action.payload)
      return state
    case "REPLACE_PHOTO":
     state.map(photo=> {
      if (action.payload.cropped_url != photo.cropped_url) {
        photo.primary = false
      } else {photo.primary = true}

     })

     return state
    case "DELETE_PHOTO":
         return state.filter(function(photo){
            return photo.id != action.payload
          })
    default:
      return state;
  }
}

export function showPrivatePhotos(state = [], action) {

  switch (action.type) {
    case "GET_PHOTOS_PRIVATE":
       return [...state, ...action.payload]
      case "ADD_PHOTO_PRIVATE":
       return [...state, {id: action.payload.json.id, url: action.payload.json.url}]
      case "RESET_PHOTOS":
        return state = []
      case "DELETE_PHOTO_PRIVATE":
         return state.filter(function(photo){
            return photo.id != action.payload
          })
    default:
      return state;
  }
}


//MODAL

export function modalPhotos(state = [], action) {
  switch (action.type) {

    case "MODAL_PHOTOS":
      return [action.payload];
    default:
      return state;
  }
}

export function openPhotosModal(state = false, action) {

  switch (action.type) {
    case "OPEN_MODAL_PHOTOS":
      return state = true;
    default:
      return state;
  }
}

export function modalIndex(state = "", action) {

  switch (action.type) {
    case "MODAL_INDEX":
      return state = action.payload;
    default:
      return state;
  }
}

// SUB-LEVEL REDUCERS

function messages(state = [], action) {
  switch (action.type) {
    case "RECEIVE_ADDED_MESSAGE":
      return [...state, action.payload];
    case "RECEIVE_MESSAGES":
      return [...state, ...action.payload.messages];
    case "PUSH_INITIAL_MESSAGE":
    case "EDIT_CONVERSATION_TITLE":
    case "RECEIVE_LEFT_CONVERSATION":
      return [...state, action.payload.message];
    default:
      return state;
  }
}

// HELPER FUNCTIONS

function editConversation(state, action, callback) {
  const oldConvoIndex = state.findIndex(
    c => c.id === action.payload.conversation_id
  );
  const oldConvo = state[oldConvoIndex];
  const newConvo = callback(oldConvo, action);
  const newConvos = [...state];
  newConvos.splice(oldConvoIndex, 1, newConvo);
  newConvos
  return newConvos;
}

// LOADER

export function loader(state = {loading: false}, action) {
  switch (action.type) {
    case "WAITING_DB":
      return state = {loading: true};
    case "RECEIVE_DB":
      return {loading: false}
    default:
      return state;
  }
}

// USER DETAILS

export function userDetails(state = {}, action) {
  switch (action.type) {
    case "USER_DETAILS":
      return state =action.payload;
    case "UPDATE_EXCITING":
      return {...state, lookingExciting: action.payload}
    default:
      return state;
  }
}

//MIN AGE


// export function minAge(state = {}, action) {
//   switch (action.type) {
//     case "UPDATE_MIN_AGE":
//       return state = action.payload.minAge;
//     default:
//       return state;
//   }
// }

// export function maxAge(state = {}, action) {
//   switch (action.type) {
//     case "UPDATE_MAX_AGE":
//       return state = action.payload.maxAge;
//     default:
//       return state;
//   }
// }

//MEMBER PAGE

export function filterOnline(state = false, action) {
  switch (action.type) {
    case "FILTER_ONLINE":
      return state = true
    case "UNFILTER_ONLINE":
      return state = false
    default:
      return state;
  }
}

export function filterPhotos(state = false, action) {
  switch (action.type) {
    case "FILTER_PHOTOS":
      return state = true
    case "UNFILTER_PHOTOS":
      return state = false
    default:
      return state;
  }
}

export function showMembersSearch(state = [], action) {
  switch (action.type) {
    case "GET_MEMBER_INFOS":
      return state = action.payload
    default:
      return state;
  }
}

export function showMemberPhotos(state = {}, action) {
  switch (action.type) {
    case "MEMBER_PHOTOS":
      return state = action.payload
    default:
      return state;
  }
}

export function showMemberPage(state = {}, action) {
  switch (action.type) {
    case "MEMBER_INFOS":
      return state = action.payload
    default:
      return state;
  }
}

//SMILEYS

export function smileysSentList (state = [], action) {
  switch(action.type){
    case "SENT_SMILEYS_LIST":
      return state = action.payload
    case "ADD_NEW_SMILEY":
      return [...state, action.payload]
    default:
      return state;
  }
}

// FAVORITES

export function favoritesList (state = [], action) {
  switch(action.type){
    case "GET_FAVORITES":
      return state = action.payload
    case  "ADD_FAVORITE":
      return [...state, action.payload]
    case "REMOVE_FAVORITE":
      state = state.filter(fav=> { return fav.user_id != action.payload})
    default:
      return state;
  }
}


// VISITOR

export function visitorsList (state = [], action) {
  switch(action.type){
    case "GET_VISITORS":
      return state = action.payload
    case  "ADD_NEW_VISITOR":
      return [...state, action.payload]
    default:
      return state;
  }
}

// SMILERS

export function smilersList (state = [], action) {
  switch(action.type){
    case "GET_SMILERS":
      return state = action.payload
    case  "ADD_NEW_SMILER":
      return [...state, action.payload]
    default:
      return state;
  }
}

// NOTIFICATIONS

  export function activityNotificationCounter (state = 0, action) {
  switch(action.type){
    case "NOTIF_ACTIVITY":
      return state + 1
    case "RESET_NOTIF_VISITORS":
      return state = 0
    default:
      return state;
    }
  }

  export function visitorNotificationCounter (state = null, action) {
  switch(action.type){
    case "ADD_NOTIF_VISITORS_TAB":
      return state + 1
    case "RESET_NOTIF_VISITORS_TAB":
      return state = 0
    case "RECEIVE_NEW_NOTIFICATIONS":
      if (action.payload.new_visitors) {
        return state = action.payload.new_visitors
      } else {
        return state
      }
    default:
      return state;
    }
  }


  export function messagesNotificationCounter (state = 0, action) {
  switch(action.type){
    case "ADD_NOTIF_TO_MESSAGES_TAB":
      return state + 1
    case "RESET_NOTIF_MESSAGES":
      return state = 0
    case "RECEIVE_NEW_NOTOFICATIONS":
      return state = action.payload.new_messages
    default:
      return state;
    }
  }



  export function smileyNotificationCounter (state = 0, action) {
  switch(action.type){
    case "ADD_NOTIF_SMILEYS_TAB":
      return state + 1
    case "RESET_NOTIF_SMILEY_TAB":
      return state = 0
    case "RECEIVE_NEW_NOTOFICATIONS":
      return state = action.payload.new_smileys
    default:
      return state;
    }
  }

  // CONVERSATIONS MODAL

  export function conversationModalFromShow (state = {}, action) {
  switch(action.type){
    case "CONVERSATION_MODAL_SHOW":
      return state = action.payload
    default:
      return state;
    }
  }


  export function convoSelectedFromShow (state = {}, action) {
  switch(action.type){
    case "CONVO_SELECTED_SHOW":
      if (action.payload) {
        return state = action.payload
      } else {
       return state
      }
    case "RESET_CONVO_ID":
     return state = {}
    default:
      return state;
    }
  }

  export function photoCropper (state = {}, action) {
  switch(action.type){
    case "ADD_PHOTO":
      return state = action.payload.json.url.url
    default:
      return state;
    }
  }

  export function showCropper (state = false, action) {
  switch(action.type){
    case "ADD_PHOTO":
      return state = true
    case "HIDE_CROPPER":
      return state = false
    default:
      return state;
    }
  }

  export function selectedPhoto (state = '', action) {
  switch(action.type){
    case "SELECTED_PHOTO":
      state = {
        url: action.payload.cropped_url,
        id:action.payload.id,
        primary: action.payload.primary
      }
      return state
    case "DELETE_PHOTO":

      return state = ""
    case "REPLACE_PHOTO":
      state = {
        url: action.payload.cropped_url,
        id:action.payload.id,
        primary: action.payload.primary
      }
      return state
    default:
      return state;
    }
  }


  export function openModalAlert (state = false, action) {
  switch(action.type){
    case "OPEN_MODAL_ALERT":
      return state = true
    default:
      return state;
    }
  }

//SIGN UP FORM

export function newStep (state = 1, action ) {
  switch(action.type){
    case "ADD_STEP":
      return state + 1
    default:
      return state;
    }
}

export function signUpForm (state ={}, action) {
  switch(action.type){
    case "ADD_AGE_FORM":
      return {...state, age: action.payload.age}
    case "GENDER_MEMBER":
      return {...state, gender: action.payload}
    case "GENDER_INTEREST":
      return {...state, genderInterest: action.payload}
    case "AGE_RANGE_INTEREST":
      state =  {...state, minAge: action.payload.minAge}
      return {...state, maxAge: action.payload.maxAge}
    case "ZIPCODE_MEMBER":
      return {...state, city: action.payload.city}
    case "NEW_MEMBER_USERNAME":
      return {...state, username: action.payload}
    case "NEW_MEMBER_PASSWORD":
      return {...state, password: action.payload
              }
    case "NEW_MEMBER_EMAIL":
      return {...state, email: action.payload
              }
    case "AGE_SIGNUP":
      return {...state, age: action.payload}
    default:
      return state;
    }
}

export function closeModal (state = null, action) {
  switch(action.type){
    case "CLOSE_MODAL":
      return state = Math.random();
    default:
      return state;
  }
}

export function deactivateInfos (state = {}, action) {
  switch(action.type){
    case "REASON_DEACTIVATE":
      return {...state, reason: action.payload};
    case "COMMENT_DEACTIVATE":
      return {...state, comment: action.payload};
    default:
      return state;
  }
}

export function filterByName (state = '', action) {
  switch(action.type){
    case "FILTER_NAME":
      state = action.payload
      return state
    default:
      return state;
  }
}

export function activeConvoObject( state = {}, action) {
  switch(action.type) {
    case "CHANGE_ACTIVE_CONVERSATION":
      if (action.payload.convo) {
        return state = action.payload.convo
      } else {
        return state
      }
    default:
      return state;
  }
}


export function fakesList( state = {}, action) {
  switch(action.type) {
    case 'FAKE_USERS':
      return state = action.payload.json
    case "RESET_CONVERSATIONS_PVT":
      return state = {}
    case "ADD_NEW_FAKE_TO_LIST":
      const newFake = action.payload
      return state = [...state, newFake]
    default:
      return state;
  }
}

export function showModalUserInfos (state = false, action) {
  switch(action.type) {
    case 'SHOW_MODAL_USER_INFOS':
      return state = true
    case 'HIDE_MODAL_USER_INFOS':
      return state = false
    default:
      return state;
  }
}

export function usersInfosModal( state = {}, action) {
  switch(action.type) {
    case 'USER_INFOS_MODAL':
      return {...state,
                username: action.payload.username,
                age: action.payload.age,
                profilPic: action.payload.photo
              }
    case 'HIDE_MODAL_USER_INFOS':
      state = {}
    case 'GET_PHOTOS_MODAL':
      return {...state, photos: action.payload}
    case 'USER_DETAILS_MODAL':
      if (action.payload) {
        return {...state,
                description: action.payload.description,
                marital_status: action.payload.marital_status,
                occupation: action.payload.occupation,
                looking_exciting: action.payload.looking_exciting,
                looking_anything: action.payload.looking_anything,
                looking_short: action.payload.looking_short,
                looking_undecided: action.payload.looking_undecided,
                looking_virtual: action.payload.looking_virtual,
                height: action.payload.height,
                smoker: action.payload.smoker,
                anything_goes: action.payload.anything_goes,
                being_dominated: action.payload.being_dominated,
                dominating: action.payload.dominating,
                normal: action.payload.normal,
                threesome: action.payload.threesome,
                secret: action.payload.secret,
                active: action.payload.active,
                shy: action.payload.shy,
                sociable: action.payload.sociable,
                modest: action.payload.modest,
                fun: action.payload.fun,
                generous: action.payload.generous,
                spiritual: action.payload.spiritual,
                moody: action.payload.moody,
                relaxed: action.payload.relaxed,
                sensitive: action.payload.sensitive,
                aerobics: action.payload.aerobics,
                golf: action.payload.golf,
                martial_arts: action.payload.martial_arts,
                soccer: action.payload.soccer,
                walking: action.payload.walking,
                rugby: action.payload.rugby,
                swimming: action.payload.swimming,
                baseball: action.payload.baseball,
                cycling: action.payload.cycling,
                running: action.payload.running,
                tennis: action.payload.tennis,
                weight: action.payload.weight,
                basketball: action.payload.basketball,
                dance: action.payload.dance,
                skiing: action.payload.skiing,
                volleyball: action.payload.volleyball,
                bowling: action.payload.bowling,
                hockey: action.payload.hockey,
                arts: action.payload.arts,
                cooking: action.payload.cooking,
                hiking: action.payload.hiking,
                networking: action.payload.networking,
                video_games: action.payload.video_games,
                book: action.payload.book,
                dining_out: action.payload.dining_out,
                movies: action.payload.movies,
                nightclubs: action.payload.nightclubs,
                religion: action.payload.religion,
                charities: action.payload.charities,
                museums: action.payload.museums,
                shopping: action.payload.shopping,
                wine: action.payload.wine,
                coffee: action.payload.coffee,
                gardening: action.payload.gardening,
                pets: action.payload.pets,
                music: action.payload.music,
                being_blinded: action.payload.being_blinded,
                costume: action.payload.costume,
                role_playing: action.payload.role_playing,
                using_sex_toys: action.payload.using_sex_toys,
                unusual_places: action.payload.unusual_places,
                being_watched: action.payload.being_watched,
                willing_experiment: action.payload.willing_experiment,
                cultivated: action.payload.cultivated,
                imaginative: action.payload.imaginative,
                independent: action.payload.independent,
                mature: action.payload.mature,
                outgoing: action.payload.outgoing,
                self_confident: action.payload.self_confident,
                reliable: action.payload.reliable,
                sophisticated: action.payload.sophisticated,
              }
      } else {
        return state
      }
    default:
      return state;
  }
}

export function showSmileys( state = false, action) {
  switch(action.type) {
    case "SHOW_SMILEYS":
      return !state
    default:
      return state;
  }
}

export function inputChatPvt (state = "", action ) {
  switch(action.type) {
    case "UPDATE_INPUT_CHAT_PVT":
      return state = action.payload
    case "EMOJI_INPUT_CHAT_PVT":
      return state += action.payload
    case "RESET_INPUT_CHAT_PVT":
      return state = ""
    default:
      return state;
  }
}

export function pageNumber (state = 1, action) {
  switch(action.type) {
    case "UPDATE_PAGE_NUMBER":
      return state = action.payload
    default:
      return state;
  }
}

export function errorLogin (state = null, action) {
  switch(action.type) {
    case "ERROR_LOGIN":
      return state = "Your username or password is invalid"
    default:
      return state;
  }
}

export function modalNoMessagesRemaining (state = null, action) {
  switch(action.type) {
    case "SHOW_NO_MESSAGES_MODAL":
      return state = true
    case "HIDE_NO_MESSAGES_MODAL":
      return state = false
    default:
      return state;
  }
}

export function membersFilteredList (state = [], action) {
  switch(action.type) {
    case "MEMBERS_FILTERED_LIST":
      return state = action.payload
    default:
      return state;
  }
}


