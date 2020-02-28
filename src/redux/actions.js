// https://test.herokuapp.com/api/v1

export const API_ROOT = `http://localhost:3000/api/v1`;


//export const API_ROOT = `https://test.herokuapp.com/api/v1`;


const token = localStorage.getItem("token");
export const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token
};



const headersForm = {
  "Content-Type": 'multipart/form-data',
  Accept: 'multipart/form-data',
  Authorization: token
};


export const editConversationTitle = (conversation_id, title, message) => {
  return {
    type: "EDIT_CONVERSATION_TITLE",
    payload: {
      conversation_id,
      title,
      message
    }
  };
};

export const changeActiveConversation = convo => {
  return {
    type: "CHANGE_ACTIVE_CONVERSATION",
    payload: {
      convo
    }
  };
};

export const showNewConversationModal = () => {
  return {
    type: "SHOW_NEW_CONVERSATION_MODAL"
  };
};

export const hideNewConversationModal = () => {
  return {
    type: "HIDE_NEW_CONVERSATION_MODAL"
  };
};

export const showUserProfileModal = () => {
  return {
    type: "SHOW_USER_PROFILE_MODAL"
  };
};

export const hideUserProfileModal = () => {
  return {
    type: "HIDE_USER_PROFILE_MODAL"
  };
};

export const showEditConversationModal = conversationId => {
  return {
    type: "SHOW_EDIT_CONVERSATION_MODAL",
    payload: conversationId
  };
};

export const hideEditConversationModal = () => {
  return {
    type: "HIDE_EDIT_CONVERSATION_MODAL"
  };
};

// API Thunks

const requestConversations = () => (
{
  type: "REQUEST_CONVERSATIONS"
});

const receiveConversations = conversations => {

  return {
    type: "RECEIVE_CONVERSATIONS",
    payload: {
      conversations
    }
  };
};

const receiveConversationsNavbar = conversations => {
  return {
    type: "RECEIVE_CONVERSATIONS_NAVBAR",
    payload: {
      conversations
    }
  };
};

export const fetchConversationsFromNavbar = userId => {
  return dispatch => {
    if (!userId) {
      dispatch(requestCurrentUser());
      fetch(`${API_ROOT}/current_user`, { headers })
        .then(res => res.json())
        .then(json => userId = json.id);
    }
    dispatch(requestConversations());
    fetch(`${API_ROOT}/user/${userId}/conversations`, { headers })
      .then(res => res.json())
      .then(conversations => {
        dispatch(receiveConversationsNavbar(conversations));
      });
  };

  return {type: "test"}
};

export const fetchConversations = userId => {
  return dispatch => {

    return fetch(`${API_ROOT}/user/${userId}/conversations`, { headers })
      .then(res => res.json())
      .then(conversations => {
      dispatch(receiveConversations(conversations));
      });
  };
};

export const cancelNewConversation = (convoId, userId) => {
  return dispatch => {
    return fetch(`${API_ROOT}/cancel_conversation`, {
      method: "POST",
      headers,
      body: JSON.stringify({ convoId })
    })
    .then(dispatch(leaveConversation(convoId)))
  }
}
/* --------------------------------------- */

const requestMessages = conversation_id => ({
  type: "REQUEST_MESSAGES",
  payload: {
    conversation_id
  }
});

const receiveMessages = messages => {
  return {
    type: "RECEIVE_MESSAGES",
    payload: {
      conversation_id: messages[0].conversation_id,
      messages
    }
  };
};

export const fetchMessagesForActiveConversation = activeConversationId => {

  return dispatch => {
    dispatch(requestMessages(activeConversationId));
    return fetch(`${API_ROOT}/conversation/${activeConversationId}/messages`, {
      headers
    })
      .then(res => res.json())
      .then(messages => {
        if (messages.length) {
          dispatch(receiveMessages(messages));
        }
      });
  };
};

/* --------------------------------------- */

const sendAddedMessage = conversation_id => {
  return (
    {
      type: "SEND_ADDED_MESSAGE",
      payload: {
        conversation_id
      }
    }
  )
};

export const receiveAddedMessageModal = newConvo => {
  return ({
      type: "RECEIVE_ADDED_MESSAGE_MODAL",
      payload: newConvo
  })
};

export const receiveAddedMessage = message => {
  return ({
      type: "RECEIVE_ADDED_MESSAGE",
      payload: message
  })
};

export const addMessage = (text, conversation_id, user_id) => {

  return dispatch => {
    dispatch(sendAddedMessage(conversation_id));
    return fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({ conversation_id, user_id, text })
    })
    // .then(res => res.json())
    // .then(message => dispatch(receiveAddedMessage(message)));
  };
};

export const addMessageFromModal = (text, conversation_id, user_id) => {

  return dispatch => {
    // dispatch(sendAddedMessage(conversation_id));
    return fetch(`${API_ROOT}/messages_from_modal`, {
      method: "POST",
      headers,
      body: JSON.stringify({ conversation_id, user_id, text })
    })
    .then(res => res.json())
    .then(message => dispatch(receiveAddedMessageModal(message)));
  };
};

export const addNotificationsToMessages = () => {
  return {
    type: "ADD_NOTIF_TO_MESSAGES_TAB"
  }
}
/* --------------------------------------- */

export const pushInitialMessage = message => ({

  type: "PUSH_INITIAL_MESSAGE",
  payload: {
    message,
    conversation_id: message.conversation_id
  }
})

/* --------------------------------------- */

const sendAddedConversation = conversation_id => ({
  type: "SEND_ADDED_CONVERSATION"
});

export const receiveAddedConversation = conversation => {
  return {
    type: "RECEIVE_ADDED_CONVERSATION",
    payload: conversation
  };
};

export const addConversation = users => {
  return dispatch => {
    dispatch(sendAddedConversation());
    return fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers,
      body: JSON.stringify({ users })
    })
      .then(res => res.json())
      .then(conversation => {
        dispatch(receiveAddedConversation(conversation));
      });
  };
};

/* --------------------------------------- */

export const receiveAddedUsers = (conversation_id, users) => {
  return {
    type: "RECEIVE_ADDED_USERS",
    payload: {
      conversation_id,
      users
    }
  }
}

/* --------------------------------------- */

export const requestCurrentUser = () => {
  return {
    type: "REQUEST_CURRENT_USER"
  };
};

const receiveNotifications = json => {
  return {
    type: "RECEIVE_NEW_NOTIFICATIONS",
    payload: {
      new_messages: json.new_messages,
      new_visitors: json.new_visitors,
      new_smileys: json.new_smileys
    }
  }
}

const receiveCurrentUser = json => {
  if (json.error) {
    return {
      type: "ERROR_LOGIN",
    }
  } else {
    return {

      type: "RECEIVE_CURRENT_USER",
      payload: {
        id: json.id,
        username: json.username,
        member: json.member,
        firstName: json.first_name,
        lastName: json.last_name,
        token: json.token,
        minAge: json.min_age,
        maxAge: json.max_age,
        photo: json.photo,
        lastLogin: json.last_login,
        new_messages: json.new_messages,
        memberGender: json.memberGender,
        email: json.email,
        age: json.age,
        remainingMessages: json.remaining_messages,
        onlineStatus: json.manually_online,
        lookingOnlineMember: json.looking_online_members,
        lookingPhotosMember: json.looking_photo_members,
        maxRadius: json.max_radius,
        confirmedUser: json.confirmed_user
      }
    };
  }
}

export const fetchNewNotification = userId => {
  return dispatch => {
    return fetch(`${API_ROOT}/new_notifications`, {
      method: "POST",
      headers,
      body: JSON.stringify({ userId})
      })
      .then(res => res.json())
      .then(json => dispatch(receiveNotifications(json)));
    };
  }


export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(requestCurrentUser());
    fetch(`${API_ROOT}/current_user`, { headers })
      .then(res => res.json())
      .then(json => dispatch(receiveCurrentUser(json)));
  };
};

/* --------------------------------------- */

export const receiveLeftConversation = (conversation_id, user_id, message) => {

  return {
    type: "RECEIVE_LEFT_CONVERSATION",
    payload: {
      conversation_id,
      user_id,
      message
    }
  };
};

export const leaveConversation = conversation_id => {
  return {
    type: "LEAVE_CONVERSATION",
    payload: {
      conversation_id
    }
  };
};

/* --------------------------------------- */

const receiveViewConversation = json => ({
  type: "RECEIVE_VIEW_CONVERSATION",
  payload: json
});

export const updateViewConversation = (user_id, conversation_id) => {
  return dispatch => {
    return fetch(`${API_ROOT}/conversation/view`, {
      method: "POST",
      headers,
      body: JSON.stringify({ user_id, conversation_id })
    })
      .then(res => res.json())
      .then(message => dispatch(receiveViewConversation(message)));
  };
};

export const resetConversationId = () => {
  return {
    type: "RESET_CONVO_ID"
  }
}
/* --------------------------------------- */

export const login = (username, password) => {
  return dispatch => {
    dispatch(requestCurrentUser());
    return fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(json => dispatch(receiveCurrentUser(json)))
      .then((json) => {
        if (json.type == "RECEIVE_CURRENT_USER") {
         (window.location.href = "/")
        }
      });
  };
};

export const noToken = () => {
  return {
    type: "NO_TOKEN"
  };
};

/* --------------------------------------- */

export const signup = params => {
  return dispatch => {
    dispatch(requestCurrentUser());
    return fetch(`${API_ROOT}/signup`, {
      method: "POST",
      headers,
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(json => dispatch(receiveCurrentUser(json)))
      .then(() => (window.location.href = "/"));
  };
};

/* --------------------------------------- */

const receiveAddedPicture = json => {
  return {
    type: "ADD_PHOTO",
    payload: {
     json
    }
  }
};

const loaderTrue = () => {
  return {
    type: "SET_LOADER"
  }
}

const loaderFalse = () => {
  return {
    type: "UNSET_LOADER"
  }
}

export const addPhoto = (photoObj) => {
  return dispatch => {
    dispatch(waitingDb());
    fetch(`${API_ROOT}/upload_pic`, {
      method: "POST",
      headersForm,
      body: photoObj
    })
      .then(res => res.json())
      .then(json => dispatch(receiveAddedPicture(json)))
      .then(() => dispatch(receiveDb()))
  };
};

/* --------------------------------------- */

const receiveGetPhotos = json => {

  return {
    type: "GET_PHOTOS",
    payload: json
  }
};



const requestPhotos = (id) => ({
  type: "REQUEST_PHOTOS"
});

export const getPhotos = (userId) => {
  return dispatch => {

    const id = userId

    return fetch(`${API_ROOT}/get_photos`, {
      method: "POST",
      headers ,
      body: JSON.stringify({userId})

    })
      .then(res => res.json())
      .then(json => dispatch(receiveGetPhotos(json)))
  };

};



const resetPhotosState = () => {
  return {
    type: "RESET_PHOTOS"
  }
}

export const resetPhotos = () => {
  return dispatch => {
    dispatch(resetPhotosState())
  }
}


const deletingPhoto = (id) => {
  return {
    type: "DELETE_PHOTO",
    payload: id
  }
}

export const deletePhotos = (photoId) => {
  return dispatch => {
    dispatch(dispatch(deletingPhoto(photoId)))
    return fetch(`${API_ROOT}/delete_photo`, {
      method: "POST",
      headers ,
      body: JSON.stringify({photoId})

    })
  }
}

/* --------------------------------------- */


const receiveGetPhotosPrivate = json => {
  return {
    type: "GET_PHOTOS_PRIVATE",
    payload: json
  }
};

export const getPhotosPrivate = (userId) => {

  return dispatch => {
    const id = userId

    return fetch(`${API_ROOT}/get_photos_private`, {
      method: "POST",
      headers ,
      body: JSON.stringify({userId})

    })
      .then(res => res.json())
      .then(json => dispatch(receiveGetPhotosPrivate(json)))
  };

};

/* --------------------------------------- */

const waitingDb = () => {
  return {
    type: "WAITING_DB"
  }
}

const receiveDb = () => {
  return {
    type: "RECEIVE_DB"
  }
}


/* --------------------------------------- */

const receiveAddedPicturePrivate = json => {

  return {
    type: "ADD_PHOTO_PRIVATE",
    payload: {
     json
    }
  }
};


export const addPhotoPrivate = (photoObj) => {
  return dispatch => {
    dispatch(waitingDb());
    return fetch(`${API_ROOT}/upload_pic_private`, {
      method: "POST",
      headersForm,
      body: photoObj
    })
      .then(res => res.json())
      .then(json => dispatch(receiveAddedPicture(json)))
      .then(() => dispatch(receiveDb()))
  };
};

const deletingPhotoPrivate = (id) => {
  return {
    type: "DELETE_PHOTO_PRIVATE",
    payload: id
  }
}

export const deleletePhotosPrivate = (photoId) => {
  return dispatch => {
    dispatch(dispatch(deletingPhotoPrivate(photoId)))
    return fetch(`${API_ROOT}/delete_photo`, {
      method: "POST",
      headers ,
      body: JSON.stringify({photoId})

    })
  }
}

const replaceSelectedPhoto = (json) => {
  return {
    type: "REPLACE_PHOTO",
    payload: json
  }
}

export const makePrimary = (userId, photoId) => {
  return dispatch => {
    let primaryObject = new FormData();
    primaryObject.append('userId', userId)
    primaryObject.append('photoId', photoId)
    return fetch(`${API_ROOT}/update_photo_primary`, {
      method: "POST",
      headersForm ,
      body: primaryObject
    })
    .then(res => res.json())
    .then(json => dispatch(replaceSelectedPhoto(json)))
  }
}


/* --------------------------------------- */

const addPhotosToModal = (urlsList) => {

  return {
    type: "MODAL_PHOTOS",
    payload: {
      urlsList
    }
  }
}

const modalIndex = (index) => {
  return {
    type: "MODAL_INDEX",
    payload: {
      index
    }
  }
}

const openModal = () => {
  return {
    type: "OPEN_MODAL_PHOTOS"
  }
}


export const addModalPhoto = ((photos,index) => {
  class ImagesUrl {
    constructor(src) {
        this.src = src }
  }
  let urlsList = []
  photos.map(photo => {
    if (photo.cropped_url) {
      let image = new ImagesUrl(photo.cropped_url)
      urlsList.push(image)
    } else {
      let image = new ImagesUrl(photo.remote_url)
      urlsList.push(image)
    }

  })
  return dispatch => {
    dispatch(addPhotosToModal(urlsList))
    dispatch(modalIndex(index))
    dispatch(openModal())

  };
});



/* --------------------------------------- */

const userDetails = (json) => {
  return {
    type: "USER_DETAILS",
    payload: {
      description: json.user_details.description,
      birthday: json.user_details.birthday,
      maritalStatus: json.user_details.marital_status,
      lookingAnything: json.user_details.looking_anything,
      lookingLong: json.user_details.looking_long,
      lookingExciting: json.user_details.looking_exciting,
      lookingLong: json.user_details.looking_long,
      lookingShort: json.user_details.looking_short,
      lookingUndecided: json.user_details.looking_undecided,
      lookingVirtual: json.user_details.looking_virtual,
      height: json.user_details.height,
      hairColor: json.user_details.hair_color,
      eyeColor: json.user_details.eye_color,
      smoker: json.user_details.smoker,
      anythingGoes: json.user_details.anything_goes,
      beingDominated: json.user_details.being_dominated,
      dominating: json.user_details.dominating,
      normal: json.user_details.normal,
      threesome: json.user_details.threesome,
      secret: json.user_details.secret,
      active: json.user_details.active,
      shy: json.user_details.shy,
      sociable: json.user_details.sociable,
      modest: json.user_details.modest,
      fun: json.user_details.fun,
      generous: json.user_details.generous,
      spiritual: json.user_details.spiritual,
      moody: json.user_details.moody,
      relaxed: json.user_details.relaxed,
      sensitive: json.user_details.sensitive,
      aerobics: json.user_details.aerobics,
      golf: json.user_details.golf,
      martialArts: json.user_details.martial_arts,
      soccer: json.user_details.soccer,
      walking: json.user_details.walking,
      bowling: json.user_details.bowling,
      hockey: json.user_details.hockey,
      rugby: json.user_details.rubgy,
      swimming: json.user_details.swimming,
      baseball: json.user_details.baseball,
      cycling: json.user_details.cycling,
      running: json.user_details.running,
      tennis: json.user_details.tennis,
      weight: json.user_details.weight,
      basketball: json.user_details.basketball,
      dance: json.user_details.dance,
      skiing: json.user_details.skiing,
      volleyball: json.user_details.volleyball,
      bowling: json.user_details.bowling,
      rugby: json.user_details.rugby,
      arts: json.user_details.arts,
      cooking: json.user_details.cooking,
      hiking: json.user_details.hiking,
      networking: json.user_details.networking,
      videoGames: json.user_details.video_games,
      book: json.user_details.book,
      diningOut: json.user_details.dining_out,
      movies: json.user_details.movies,
      nightclubs: json.user_details.nightclubs,
      religion : json.user_details.religion,
      charities: json.user_details.charities,
      museums: json.user_details.museums,
      shopping: json.user_details.shopping,
      wine: json.user_details.wine,
      coffee: json.user_details.coffee,
      gardening: json.user_details.gardening,
      pets: json.user_details.pets,
      music: json.user_details.music,
      beingBlind: json.user_details.being_blinded,
      costume: json.user_details.costume,
      rolePlaying: json.user_details.role_playing,
      usingSexToys: json.user_details.using_sex_toys,
      unusualPlaces: json.user_details.unusual_places,
      beingWatched: json.user_details.being_watched,
      willingExperiment: json.user_details.willing_experiment,
      cultivated: json.user_details.cultivated,
      imaginative: json.user_details.imaginative,
      independent: json.user_details.independent,
      mature: json.user_details.mature,
      selfConfident: json.user_details.self_confident,
      reliable: json.user_details.reliable,
      sophisticated: json.user_details.sophisticated,
      outgoing: json.user_details.outgoing,
      feet: json.user_details.feet,
      inches: json.user_details.inches
    }
  }
}

export const getUserDetails = (userId) => {
  return dispatch => {
    // dispatch(dispatch(deletingPhotoPrivate(photoId)))
    fetch(`${API_ROOT}/get_user_details`, {
      method: "POST",
      headers ,
      body: JSON.stringify({userId})

    })
      .then(res => res.json())
      .then(json => dispatch(userDetails(json)))
  }
}

/* --------------------------------------- */
//UPDATING PROFILE

export const updateDescription = (userId, description) => {
  return dispatch => {
    let formDescription= new FormData();
    formDescription.append('userId', userId)
    formDescription.append('description', description)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formDescription

    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}

export const updateBirthday = (userId, birthday) => {
  return dispatch => {
    let formBirthday= new FormData();
    formBirthday.append('userId', userId)
    formBirthday.append('birthday', birthday)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formBirthday
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}

export const updateHair = (userId, hair) => {
  return dispatch => {
    let formHair= new FormData();
    formHair.append('userId', userId)
    formHair.append('hair', hair)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formHair
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}


export const updateInches = (userId, inches) => {
  return dispatch => {
    let formHeight= new FormData();
    formHeight.append('userId', userId)
    formHeight.append('inches', inches)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formHeight
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}

export const updateFeet = (userId, feet) => {
  return dispatch => {
    let formHeight= new FormData();
    formHeight.append('userId', userId)
    formHeight.append('feet', feet)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formHeight
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}

export const updateEye = (userId, eye) => {
  return dispatch => {
    let formEye= new FormData();
    formEye.append('userId', userId)
    formEye.append('eye', eye)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formEye
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}


export const updateSought = (userId, name, sought) => {
  return dispatch => {
    let formSought= new FormData();
    formSought.append('userId', userId)
    formSought.append(`${name}`, sought)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formSought
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}



export const updateSmoker = (userId, smoker) => {
  return dispatch => {
    let formSmoker= new FormData();
    formSmoker.append('userId', userId)
    formSmoker.append('smoker', smoker)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formSmoker
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}

export const maritalStatus = (userId, status) => {
  return dispatch => {
    let formStatus= new FormData();
    formStatus.append('userId', userId)
    formStatus.append('maritalStatus', status)
    return fetch(`${API_ROOT}/update_details`, {
      method: "POST",
      headersForm,
      body: formStatus
    })
    .then(res => res.json())
    .then(json => dispatch(userDetails(json)))
  }
}
/* --------------------------------------- */
//UPDATING AGE

const minAge = (age) => {
  return {
    type: "UPDATE_MIN_AGE",
    payload: {
      minAge: age
    }
  }
}

const maxAge = (age) => {
  return {
    type: "UPDATE_MAX_AGE",
    payload: {
      maxAge: age
    }
  }
}


export const updateMaxAge = (maxiAge, userId, miniAge) => {
  return dispatch => {
    let ageObject = new FormData();
    ageObject.append('maxAge', maxiAge)
    ageObject.append('userId', userId)
    return fetch(`${API_ROOT}/update_max_age`, {
      method: "POST",
      headersForm,
      body: ageObject
    })
    .then(() => dispatch(maxAge(maxiAge)))
    .then(dispatch(fetchMembers(miniAge, maxiAge, userId)))
  }
}


export const updateMinAge = (miniAge, userId, maxAge) => {
  return dispatch => {
    let ageObject = new FormData();
    ageObject.append('minAge', miniAge)
    ageObject.append('userId', userId)
    return fetch(`${API_ROOT}/update_min_age`, {
      method: "POST",
      headersForm,
      body: ageObject
    })
    .then(dispatch(minAge(miniAge)))
    .then(dispatch(fetchMembers(miniAge, maxAge, userId)))
  }
}

/* --------------------------------------- */
//GET MEMBER INFO

const membersInfos = (json) => {
  return {
    type: "GET_MEMBER_INFOS",
    payload: json
  }
}

export const fetchMembers = (minAge, maxAge, userId) => {

  return dispatch => {
    let ageObject = new FormData();
    ageObject.append('minAge', minAge)
    ageObject.append('maxAge', maxAge)
    ageObject.append('userId', userId)
    return fetch(`${API_ROOT}/get_members`, {
      method: "POST",
      headersForm,
      body: ageObject
    })
    .then(res => res.json())
    .then(json => dispatch(membersInfos(json)))
  }
}

const memberInfos = (json) => {
  return {
    type: "MEMBER_INFOS",
    payload:{
      description: json.user_details.description,
      birthday: json.user_details.birthday,
      maritalStatus: json.user_details.marital_status,
      lookingAnything: json.user_details.looking_anything,
      lookingLong: json.user_details.looking_long,
      lookingExciting: json.user_details.looking_exciting,
      lookingLong: json.user_details.looking_long,
      lookingShort: json.user_details.looking_short,
      lookingUndecided: json.user_details.looking_undecided,
      lookingVirtual: json.user_details.looking_virtual,
      feet: json.user_details.feet,
      inches: json.user_details.inches,
      hairColor: json.user_details.hair_color,
      eyeColor: json.user_details.eye_color,
      smoker: json.user_details.smoker,
      anythingGoes: json.user_details.anything_goes,
      beingDominated: json.user_details.being_dominated,
      dominating: json.user_details.dominating,
      normal: json.user_details.normal,
      threesome: json.user_details.threesome,
      secret: json.user_details.secret,
      active: json.user_details.active,
      shy: json.user_details.shy,
      sociable: json.user_details.sociable,
      modest: json.user_details.modest,
      fun: json.user_details.fun,
      generous: json.user_details.generous,
      spiritual: json.user_details.spiritual,
      moody: json.user_details.moody,
      relaxed: json.user_details.relaxed,
      sensitive: json.user_details.sensitive,
      aerobics: json.user_details.aerobics,
      golf: json.user_details.golf,
      martialArts: json.user_details.martial_arts,
      soccer: json.user_details.soccer,
      walking: json.user_details.walking,
      bowling: json.user_details.bowling,
      hockey: json.user_details.hockey,
      rugby: json.user_details.rubgy,
      swimming: json.user_details.swimming,
      baseball: json.user_details.baseball,
      cycling: json.user_details.cycling,
      running: json.user_details.running,
      tennis: json.user_details.tennis,
      weight: json.user_details.weight,
      basketball: json.user_details.basketball,
      dance: json.user_details.dance,
      skiing: json.user_details.skiing,
      volleyball: json.user_details.volleyball,
      bowling: json.user_details.bowling,
      rugby: json.user_details.rugby,
      arts: json.user_details.arts,
      cooking: json.user_details.cooking,
      hiking: json.user_details.hiking,
      networking: json.user_details.networking,
      videoGames: json.user_details.video_games,
      book: json.user_details.book,
      diningOut: json.user_details.dining_out,
      movies: json.user_details.movies,
      nightclubs: json.user_details.nightclubs,
      religion : json.user_details.religion,
      charities: json.user_details.charities,
      museums: json.user_details.museums,
      shopping: json.user_details.shopping,
      wine: json.user_details.wine,
      coffee: json.user_details.coffee,
      gardening: json.user_details.gardening,
      pets: json.user_details.pets,
      music: json.user_details.music,
      beingBlind: json.user_details.being_blinded,
      costume: json.user_details.costume,
      rolePlaying: json.user_details.role_playing,
      usingSexToys: json.user_details.using_sex_toys,
      unusualPlaces: json.user_details.unusual_places,
      beingWatched: json.user_details.being_watched,
      willingExperiment: json.user_details.willing_experiment,
      cultivated: json.user_details.cultivated,
      imaginative: json.user_details.imaginative,
      independent: json.user_details.independent,
      mature: json.user_details.mature,
      selfConfident: json.user_details.self_confident,
      reliable: json.user_details.reliable,
      sophisticated: json.user_details.sophisticated,
      outgoing: json.user_details.outgoing,
      feet: json.user_details.feet,
      inches: json.user_details.inches,
      age: json.user.age,
      city: json.user.city,
      username: json.user.username,
      photoProfil: json.user.photo,
    }
  }
}

const memberPhotos = (json) => {
  return{
    type: "MEMBER_PHOTOS",
    payload: json
  }
}

export const getMemberInfo = (userId) => {
  return dispatch => {
    fetch(`${API_ROOT}/get_user_details`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(memberInfos(json)))

    return fetch(`${API_ROOT}/get_photos`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(memberPhotos(json)))
  }
}

/* --------------------------------------- */
//SMILEYS

const addNewSmiley = (newSmiley) => {
  return {
    type: "ADD_NEW_SMILEY",
    payload: newSmiley
  }
}



export const sendSmiley = (memberId,userId) => {
  return dispatch => {
    let smileyForm = new FormData();
    smileyForm.append("memberId", memberId)
    smileyForm.append("userId", userId)

    fetch(`${API_ROOT}/create_smiley`, {
      method: "POST",
      headersForm,
      body: smileyForm
    })
    .then(res => res.json())
    .then(json => dispatch(addNewSmiley(json)))
  }
}



const smileysSentList = (json) => {
  let arrSentSmiley = []
  return{
    type: "SENT_SMILEYS_LIST",
    payload: json
  }
}


export const fetchFavorites = (userId, memberId) => {
  return dispatch => {
    fetch(`${API_ROOT}/get_favorites`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(getFavoritesList(json)))
    .then(dispatch(createVisit(memberId,userId)))
  }
}



export const getSentSmileysList = (userId, memberId) => {
  return dispatch => {
    fetch(`${API_ROOT}/sent_smileys`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(smileysSentList(json)))
    .then(dispatch(fetchFavorites(userId, memberId)))
  }
}

const addCounterToSmiley = () => {
  return {
    type: "ADD_NOTIF_SMILEYS_TAB"
  }
}

const addNewSmiler = (newSmiler) => {
  const date = new Date()
  return {
    type: "ADD_NEW_SMILER",
    payload: {user: {
                     photo: newSmiler.photo,

                     first_name: newSmiler.first_name
                    },
              created_at: date.toString(),
              }
  }
}


export const   addNotificationsSmileysTab = (newSmiler) => {
  return dispatch => {
    dispatch(addNewSmiler(newSmiler))
    dispatch(addNotificationToActivity())
    dispatch(addCounterToSmiley())
  }
}



/* --------------------------------------- */
//FAVORITES

const getFavoritesList = (json) => {
  return {
    type: "GET_FAVORITES",
    payload: json
  }
}

const addNewFavorite = (json) => {
  return {
    type: "ADD_FAVORITE",
    payload: json
  }
}

export const getFavorites = (userId) => {
  return dispatch => {
    fetch(`${API_ROOT}/get_favorites`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(getFavoritesList(json)))
    .then(dispatch(fetchVisitorsList(userId)))
    // .then(fetchSmilersList(userId))
  }
}


const removeFav = (memberId) => {
  return {
    type: "REMOVE_FAVORITE",
    payload: memberId
  }
}

export const removeFavorite = (memberId, userId) => {
  return dispatch => {
    let favoriteForm = new FormData();
    favoriteForm.append("memberId", memberId)
    favoriteForm.append("userId", userId)

    fetch(`${API_ROOT}/remove_favorite`, {
      method: "POST",
      headersForm,
      body: favoriteForm
    })
    .then(dispatch(removeFav(memberId)))
  }
}


export const addFavorite = (memberId, userId) => {
  return dispatch => {
    let favoriteForm = new FormData();
    favoriteForm.append("memberId", memberId)
    favoriteForm.append("userId", userId)

    fetch(`${API_ROOT}/create_favorite`, {
      method: "POST",
      headersForm,
      body: favoriteForm
    })
    .then(res => res.json())
    .then(json => dispatch(addNewFavorite(json)))
  }
}

/* --------------------------------------- */
//CONVERSATION FROM SHOW MEMBER

const convoFromShow = (json) => {
  return {
    type: "CONVO_SELECTED_SHOW",
    payload: json.id
  }
}

export const conversationFromMemberShow = (userId,memberId) => {
  let conversationForm = new FormData()
  conversationForm.append("visitorId", userId)
  conversationForm.append("memberId", memberId)

  return dispatch => {
    fetch(`${API_ROOT}/check_conversation`, {
      method: "POST",
      headersForm,
      body: conversationForm
    })
    .then(res => {

      return res.json()
    })
    .then(json => dispatch(convoFromShow(json)))
  }
}


export const createVisit = (visitorId, memberId) => {
  let visitForm = new FormData()
  visitForm.append("visitor_id", visitorId)
  visitForm.append("user_id", memberId)
  return dispatch => {
    fetch(`${API_ROOT}/create_visit`, {
      method: "POST",
      headersForm,
      body: visitForm
    })
  }
}

export const addNewConversation = (convo) => {
  return {
    type: "ADD_CONVERSATION",
    payload: convo.conversation
  }
}

/* --------------------------------------- */
//FETCH FAVORITE LIST



// export const fetchFavoriteList = (userId) => {
//   return dispatch => {
//     fetch(`${API_ROOT}/favorites_list`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify({userId})
//     })
//      .then(res => res.json())
//      .then(json => json)
//      .then(dispatch(fetchVisitorsList(userId)))
//   }
// }


const addFavoriteToList = (json) => {
  return {
    type: "ADD_FAVORITE",
    payload: json
  }
}


export const addReceivedFavorite = (newFav) => {
  return dispatch => {
    dispatch(addFavoriteToList(newFav))
  }
}

/* --------------------------------------- */
//NEW VISITOR LIST

const resetNotifsVisitor = () => {
  return {
    type: "RESET_NOTIF_VISITORS"
  }
}

export const resetNotifsMessages = () => {
  return {
    type: "RESET_NOTIF_MESSAGES"
  }
}

const addNotificationToActivity = () => {
    if (window.location.pathname != "/") {
      return {
        type: "NOTIF_ACTIVITY"
      }
    } else {
      return {
        type: "NOTHING"
      }
    }
  }

const addNewVisitorToList = (newVisitor) => {
  const date = new Date()
  return {
    type: "ADD_NEW_VISITOR",
    payload: {user: {
                     photo: newVisitor.photo,

                     first_name: newVisitor.first_name
                    },
              created_at: date.toString(),
              }
  }
}

export const addNewVisitor = (newVisitor) => {
  return dispatch => {
    dispatch(addNewVisitorToList(newVisitor))
    dispatch(addNotificationToActivity())
  }
}

export const resetCounterNotification = () => {
  return dispatch => {
    dispatch(resetNotifsVisitor())
  }
}

export const resetNotificationsVisitor = () => {
  return dispatch => {
    dispatch(resetNotifsVisitor())
  }
}

const resetNotifsVisitorsTab = () => {
  return {
    type: "RESET_NOTIF_VISITORS_TAB"
  }
}

const addNotifsVisitorsTab = () => {
  return {
    type: "ADD_NOTIF_VISITORS_TAB"
  }
}

export const addNotificationsVisitorsTab = (newVisitor) => {
  return dispatch => {
    dispatch(addNewVisitorToList(newVisitor))
    dispatch(addNotificationToActivity())
    dispatch(addNotifsVisitorsTab())
  }
}


export const resetNotificationsVisitorTab = () => {
  return dispatch => {
    dispatch(resetNotifsVisitorsTab())
  }
}


const resetNotifsSmileysTab = () => {
  return {
    type: "RESET_NOTIF_SMILEY_TAB"
  }
}

export const resetNotificationsSmileyTab = () => {
  return dispatch => {
    dispatch(resetNotifsSmileysTab())
  }
}

/* --------------------------------------- */
//FETCH VISITORS LIST


const visitorsList = (json) => {
  return {
    type: 'GET_VISITORS',
    payload: json
  }
}


export const fetchVisitorsList = (userId) => {
  return dispatch => {
     fetch(`${API_ROOT}/visitors_list`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
     .then(res => res.json())
     .then(json => dispatch(visitorsList(json)))
     .then(dispatch(fetchSmilersList(userId)))

  }
}

/* --------------------------------------- */
//FETCH SMILER LIST

const smilersList = (json) => {
  return {
    type: 'GET_SMILERS',
    payload: json
  }
}


export const fetchSmilersList = (userId) => {
  return dispatch => {
     fetch(`${API_ROOT}/smilers_list`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
     .then(res => res.json())
     .then(json => dispatch(smilersList(json)))
  }
}


/* --------------------------------------- */

export const updatePhotoCropper = (photoPath) => {
  return {
    type: "UPDATE_PHOTO_CROPPER",
    payload: photoPath
  }
}

const hideCropper = () => {
  return {
    type: "HIDE_CROPPER"
  }
}

const replaceCroppedUrl = (json) => {
  return {
    type: "REPLACE_WITH_CROPPED",
    payload: json
  }
}

export const addCroppingValues = (x,y,width,height, url, userId) => {
  return dispatch => {
    let cropForm = new FormData();
    cropForm.append('x', x)
    cropForm.append('y', y )
    cropForm.append('width', width)
    cropForm.append('height', height)
    cropForm.append('url', url)

    fetch(`${API_ROOT}/crop_photo`, {
      method: "POST",
      headersForm,
      body: cropForm
    })
    .then(res => res.json())
    .then(json => {dispatch(replaceCroppedUrl(json))
                   dispatch(selectedPhoto({cropped_url: json.cropped_url, id: json.id}))
                  })
    .then(dispatch(hideCropper()))
  }
}

 export const selectedPhoto = (photoObject) => {
  return {
    type: 'SELECTED_PHOTO',
    payload: photoObject
  }
 }


/* --------------------------------------- */

  export const handleLogout = (userId) => {
    fetch(`${API_ROOT}/logout`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
  }

/* --------------------------------------- */

const blockMemberModal = () => {
  return {
    type: 'OPEN_MODAL_ALERT',
  }
}

export const blockMember = (userId, memberId) => {
  return dispatch => {
    dispatch(blockMemberModal())
    return fetch(`${API_ROOT}/new_block`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId, memberId})
    })
    .then(() => dispatch(fetchConversations(userId)))

  }
}


export const blockMemberFromConvo = (convoId) => {
  return dispatch => {
    dispatch(blockMemberModal())
    fetch(`${API_ROOT}/new_block_convo`, {
      method: "POST",
      headers,
      body: JSON.stringify({convoId})
    })
  }
}

export const newStep = () => {
  return {
    type: 'ADD_STEP'
  }
}

export const genderMember = (gender) => {
  return {
    type: 'GENDER_MEMBER',
    payload: gender
  }
}

export const genderInterest = (gender) => {
  return {
    type: 'GENDER_INTEREST',
    payload: gender
  }
}

export const ageRange = (minAge, maxAge) => {
  return {
    type: 'AGE_RANGE_INTEREST',
    payload: {minAge: minAge, maxAge: maxAge}
  }
}

export const zipcodeMember = (zipcode) => {
  return {
    type: 'ZIPCODE_MEMBER',
    payload: {city: zipcode}
  }
}


export const signUpFinal = (stateObject) => {

  return dispatch => {
    fetch(`${API_ROOT}/signup`, {
      method: "POST",
      headers,
      body: JSON.stringify({
                            username: stateObject.username,
                            email: stateObject.email,
                            password: stateObject.password,
                            age: stateObject.age,
                            member_gender: stateObject.gender,
                            gender_interest: stateObject.genderInterest,
                            min_age: stateObject.minAge,
                            max_age: stateObject.maxAge,
                            city: stateObject.city
                          })
    })
    .then(res => res.json())
    .then(json => dispatch(receiveCurrentUser(json)))
    .then(() => (window.location.href = "/"))
  }
}


export const updateAgeSignup = (age) => {
  return {
    type: "AGE_SIGNUP",
    payload: age
  }
}

export const newMemberUsername = (username) => {
  return {
    type: 'NEW_MEMBER_USERNAME',
    payload: username
  }
}


export const newMemberPassword = (password) => {
  return {
    type: 'NEW_MEMBER_PASSWORD',
    payload: password
  }
}

export const newMemberEmail = (password) => {
  return {
    type: 'NEW_MEMBER_EMAIL',
    payload: password
  }
}

/* --------------------------------------- */
//PASSWORD

export const forgotPassword = (email) => {
  return dispatch => {
    fetch(`${API_ROOT}/password/forgot`, {
      method: "POST",
      headers,
      body: JSON.stringify({email})
    })
  }
}

export const resetPassword = (newPassword, token) => {
  return dispatch => {
    fetch(`${API_ROOT}/password/reset`, {
      method: "POST",
      headers,
      body: JSON.stringify({newPassword, token})
    })
    .then(window.location.href = '/welcome')
  }
}

/* --------------------------------------- */
//MODALS ERRORS/SUCCESS

export const closeModal = (newPassword, token) => {
  return {
    type: "CLOSE_MODAL"
  }
}

export const updateEmail = (newEmail) => {
  return {
    type: "UPDATE_EMAIL",
    payload: newEmail
  }
}

export const reasonDeactivate = (reason) => {
  return {
    type: "REASON_DEACTIVATE",
    payload: reason
  }
}

export const commentDeactivate = (comment) => {
  return {
    type: "COMMENT_DEACTIVATE",
    payload: comment
  }
}

export const filterName = (letters) => {
  return {
    type:   'FILTER_NAME',
    payload: letters
  }
}

/* --------------------------------------- */
//AGE

const updateCurrenUserAge = (age) => {
  return {
    type: 'UPDATE_AGE',
    payload: age
  }
}

export const updateAge = (age) => {
  return dispatch => {
    dispatch(updateCurrenUserAge(age))
    fetch(`${API_ROOT}/update_age`, {
      method: "POST",
      headers,
      body: JSON.stringify({age})
    })
  }
}


/* --------------------------------------- */
//PRIVATE

const requestMessagesPvt = (conversation_id, convoObject) => ({
  type: "REQUEST_MESSAGES",
  payload: {
    conversation_id,
    convoObject
  }
});


export const fetchMessagesForActiveConversationPvt = (activeConversationId, convoObject) => {
  return dispatch => {
    dispatch(requestMessagesPvt(activeConversationId, convoObject));
    return fetch(`${API_ROOT}/conversation/${activeConversationId}/messages`, {
      headers
    })
      .then(res => res.json())
      .then(messages => {
        if (messages.length) {
          dispatch(receiveMessages(messages));
        }
      });
  };
};

const fakeUsersList = (json) => ({
  type: "FAKE_USERS",
  payload: {
    json
  }
});


export const fetchFakeUsers = () => {

  return dispatch => {
    return fetch(`${API_ROOT}/fake_users`, {
      headers
    })
      .then(res => res.json())
      .then(json => dispatch(fakeUsersList(json)));
    }
};

const receiveConversationsPvt = conversations => {
  
  return {
    type: "RECEIVE_CONVERSATIONS_PVT",
    payload: {
      conversations
    }
  };
};

export const fetchConversationsPvt = userId => {

  return dispatch => {

    dispatch(requestConversations());
    return fetch(`${API_ROOT}/user/${userId}/conversations`, { headers })
      .then(res => res.json())
      .then(conversations => {
        dispatch(receiveConversationsPvt(conversations));
      });
  };
};

  export const resetConversationsPvt = conversations => {
    return {
      type: "RESET_CONVERSATIONS_PVT",
    };
  };


  const addModalUserDetails = json => {
    return {
      type: "USER_DETAILS_MODAL",
      payload: json
    };
  }

  const addPhotosToModalInfos = json => {
    return {
      type: "GET_PHOTOS_MODAL",
      payload: json
    };
  }

  const addModalUserInfos = json => {
    return {
      type: "USER_INFOS_MODAL",
      payload: json
    };
  }

  const resetModalUserState = () => {
    return {
      type: "RESET_INFOS_MODAL"
    };
  }

  export const hideModalUserInfosDetails = () => {
    return {
      type: "HIDE_MODAL_USER_INFOS"
    };
  }


  const showModalUserInfosDetails = () => {
    return {
      type: "SHOW_MODAL_USER_INFOS"
    };
  }

  export const showModalUserInfos = userId => {
    return dispatch => {
    dispatch(showModalUserInfosDetails())
    fetch(`${API_ROOT}/get_user_infos`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(addModalUserInfos(json)))
    fetch(`${API_ROOT}/get_user_details`, {
      method: "POST",
      headers,
      body: JSON.stringify({userId})
    })
    .then(res => res.json())
    .then(json => dispatch(addModalUserDetails(json)))
    fetch(`${API_ROOT}/get_photos`, {
        method: "POST",
        headers,
        body: JSON.stringify({userId})
      })
      .then(res => res.json())
      .then(json => dispatch(addPhotosToModalInfos(json)))
    }
  }

  export const showSmileys = () => {
    return {
      type: "SHOW_SMILEYS"
    }
  }

  export const chatInputPvt = (e) => {
    return {
      type: "UPDATE_INPUT_CHAT_PVT",
      payload: e
    }
  }

  export const addEmojiPvt = (e) => {
    return {
      type: "EMOJI_INPUT_CHAT_PVT",
      payload: e
    }
  }

  export const resetChatPvt = (e) => {
    return {
      type: "RESET_INPUT_CHAT_PVT",
      payload: e
    }
  }
  export const updateCounter = () => {
    return {
      type: "UPDATE_COUNTER",
    }
  }

  const unfilterOnlineSearch = () => {
    return {
      type: "UNFILTER_ONLINE",
    }
  }

  export const unfilterOnline = () => {
    return dispatch => {
      dispatch(unfilterOnlineSearch())
      return fetch(`${API_ROOT}/search_online_members`, {
        method: "POST",
        headers,
        body: JSON.stringify({ online: false })
      })
    }
  }

  const filterOnlineSearch = () => {
    return {
      type: "FILTER_ONLINE",
    }
  }


  export const filterOnline = () => {
    return dispatch => {
      dispatch(filterOnlineSearch())
      return fetch(`${API_ROOT}/search_online_members`, {
        method: "POST",
        headers,
        body: JSON.stringify({ online: true })
      })
    }
  }

  const filterPhotosSearch = () => {
    return {
      type: "FILTER_PHOTOS",
    }
  }

  export const filterPhotos = () => {
    return dispatch => {
      dispatch(filterPhotosSearch())
      return fetch(`${API_ROOT}/search_photos_members`, {
        method: "POST",
        headers,
        body: JSON.stringify({ photos: true })
      })
    }
  }


  const unfilterPhotosSearch = () => {
    return {
      type: "UNFILTER_PHOTOS",
    }
  }

  export const unfilterPhotos = () => {
    return dispatch => {
      dispatch(unfilterPhotosSearch())
      return fetch(`${API_ROOT}/search_photos_members`, {
        method: "POST",
        headers,
        body: JSON.stringify({ photos: false })
      })
    }
  }


  const changeOnlineStatus = () => {
    return {
      type: "CHANGE_ONLINE_STATUS",
    }
  }

  export const showModalNoMessageaRemaining = () => {
    return {
      type: "SHOW_NO_MESSAGES_MODAL",
    }    
  }

  export const hideModalNoMessageaRemaining = () => {
    return {
      type: "HIDE_NO_MESSAGES_MODAL",
    }    
  }

  export const updateOnlineStatus = () => {
    return dispatch => {
      dispatch(changeOnlineStatus())
      return fetch(`${API_ROOT}/update_online_status`, {
        headers
      })
    }
  }

  export const updatePageNumber = (pageNumber) => {
    return {

      type: "UPDATE_PAGE_NUMBER",
      payload: pageNumber
    }
  }


  const updateDistanceReducer = (distance) => {
    return {
      type: 'UPDATE_DISTANCE',
      payload: distance
    }
  }

  export const updateDistance = (distance) => {
    return dispatch => {
      dispatch(updateDistanceReducer(distance))
      return fetch(`${API_ROOT}/update_distance`, {
        method: "POST",
        headers,
        body: JSON.stringify({ distance})
      })
      .then(res => res.json())
      .then(json => dispatch(membersInfos(json)))
    }
  }

  const confirmAccount = () => {
    return {
      type: "CONFIRM_ACCOUNT",
    }
  }

  const errorConfirmAccount = () => {
    return {
      type: "ERROR_CONFIRM_ACCOUNT",
    }
  }

export const confirmationCode = (activationCode, userId) => {
  return dispatch => {
    return fetch(`${API_ROOT}/check_activation_code`, {
      method: "POST",
      headers,
      body: JSON.stringify({ activationCode, userId })
    })
    .then(res => res.json())
    .then(function confCode(json) {if (json.error){
        dispatch(errorConfirmAccount())
      } else {
        dispatch(confirmAccount())
      }
    })
  }
}

  export const addNewFakeToList = (newFake) => {
    return {
      type: "ADD_NEW_FAKE_TO_LIST",
      payload: newFake
    }
  }

  export const cleanDoublons = (fakesList) => {
    let uniq = a => [...new Set(a)];
    let uniqConvos = uniq(fakesList);
    return {
      type: "CLEAN_DOUBLONS",
      payload: uniqConvos
    }
  }

  export const updateMembersFilteredList = (memberList) => {
    return {
      type: "MEMBERS_FILTERED_LIST",
      payload: memberList
    }
  }

