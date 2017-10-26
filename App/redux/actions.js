///import { ADD_PERSON, DELETE_PERSON } from './constants';

export function Select_user(User) {
  return {
    type: "SET_USER",
    User
  };
}

export function Current_adventure(adv) {
  return {
    type: "SET_ADVENTURE",
    adv
  };
}

export function Current_location(loc) {
  return {
    type: "SET_LOCATION",
    loc
  };
}

export function Current_Stop(stop) {
  return {
    type: "SET_CURRENTSTOP",
    stop
  };
}

export function Gps_Marker(gps) {
  return {
    type: "SET_GPS",
    gps
  };
}
export function Marker_locations(mark) {
  return {
    type: "SET_Markers",
    mark
  }
}

export function Add_Badge(badge) {
  return {
    type: "ADD_BADGE",
    badge
  };
}

export function Token(token) {
  return {
    type: "SET_Token",
    token
  };
}

export function Set_Adv_Counter(advCounter) {
  return {
    type: "SET_Adv_Counter",
    advCounter
  };
}

export function Set_Badges(badges) {
  return {
    type: "SET_Badges",
    badges
  };
}

export function Set_cities(cities) {
  return {
    type: "SET_cities",
    cities
  };
}

export function Set_miles(miles) {
  return {
    type: "SET_miles",
    miles
  };
}

export function Recommendations(Recommendations) {
  return {
    type: "SET_Recommendations",
    Recommendations
  }
}

export function Download_Adventures(Adventures) {
  return {
    type: "SET_Adventures",
    Adventures
  }
}