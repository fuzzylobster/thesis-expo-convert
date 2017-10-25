const initialState = {
  user: 35,
  gps: {
    latitude: 29,
    longitude: -90
  },
  Background:
    "https://previews.123rf.com/images/katjagerasimova/katjagerasimova1603/katjagerasimova160300140/54234479-Hand-drawn-mountain-wind-rose-compass-Tribal-template-in-boho-style-Isolated-Vector-illustration-Inv-Stock-Vector.jpg",
  location: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  },
  formData: {},
  photos: [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJmiK3Y8sYebZUTq5dfCwrv_pzXQIoGxZMqxZ5mb1dFuZ8CEhr"
    },
    {
      image:
        "http://90sbarcrawl.com/wp-content/uploads/2016/04/pub-crawl-4-16-BWP-93.jpg"
    },
    {
      image:
        "http://d1bhvwz6nty0cr.cloudfront.net/wp-content/uploads/20170117100837/DallasArtsDistrict_EventHero_52.jpg"
    },
    {
      image: "https://media.timeout.com/images/100729813/image.jpg"
    }
  ],
  cities: [],
  adventure: {
    name: "Jake",
    miles: 5,
    cities: ["New Orleans, Metairie"],
    markerLocations: [
      {
        name: '729 Louque Pl',
        location: {
          lat: 29.9891516,
          lng: -90.10870279999999,
        }
      },
      {
        name: 'Somewhere Else',
        location: { lng: -90.070598, lat: 29.946033 }
      },
      {
        name: 'Last Place',
        location: { lng: -90.070043, lat: 29.94523 }
      },
    ]
  },
  pastAdventures: [
    {
      cover:
        "https://www.orlandoinformer.com/wp-content/uploads/2011/08/port-of-entry-islands-of-adventure-725-oi.jpg",
      city: "New Orleans, LA",
      likes: 12,
      comments: 10,
      distance: 3,
      badges: ["Trail Maker"]
    },
    {
      cover:
        "http://cdn1.theodysseyonline.com/files/2015/11/21/635837430566856627-1324495185_tndkklvnxeoprzcusexl.jpg",
      city: "New Orleans, LA",
      likes: 35,
      comments: 3,
      distance: 4,
      badge: []
    }
  ],
  AdvCounter: 0,
  CurrentStopIndex: 0,
  CurrentStop: {
    name: '729 Louque Pl',
    location: {
      lat: 29.9891516,
      lng: -90.10870279999999, }
  },
  badges: [
    
      "Let's Get Going!"
    
  ],
  stockPhotos: [
    {
      image:
        "https://az616578.vo.msecnd.net/files/2016/09/11/6360922286821585541523176234_party%20school.jpg"
    },
    {
      image:
        "http://lukacsbaths.com/wp-content/uploads/2013/10/Szechenyi-Bath-Party-September-7-Sparty-Girl-Wow-Lights.jpg"
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXV6QAWuF9h_D0jHLsDPibomXqvUT_FSVJiJPrfj7tkjlmR4MfUg"
    },
    {
      image:
        "http://media.istockphoto.com/photos/young-sisters-watching-fireworks-on-new-years-day-picture-id637668670?k=6&m=637668670&s=612x612&w=0&h=Ad6Hpcz0ktPMZW9cx2WC286HymnhSZen8tmmJs2ehJQ="
    },
    {
      image:
        "http://www.myneworleans.com/images/cache/cache_f/cache_0/cache_4/McNulty.03.21.02-8285540f.jpeg?ver=1468732218&aspectratio=1.5156794425087"
    },
    {
      image:
        "https://www.redbeansandlife.com/wp-content/uploads/2014/08/Featured-Midsummer-Mardi-Gras-Late-at-Night-New-Orleans-Block-Party.jpg"
    },
    {
      image:
        "http://www.luxuryawaits.com/wp-content/uploads/2016/05/trombone-jazzfest-20161.jpg"
    },
    {
      image:
        "http://img1.10bestmedia.com/Images/Photos/33049/p-monteleone-hotel-carousel-bar-new-orleans-la-usa-nightlife-lounges-hotel-bar-222016_54_990x660_201405311531.jpg"
    },
    {
      image:
        "http://d1bhvwz6nty0cr.cloudfront.net/wp-content/uploads/20170117100837/DallasArtsDistrict_EventHero_52.jpg"
    },
    {
      image: "https://media.timeout.com/images/100729813/image.jpg"
    }
  ],
  adventureType: [
    {
      city: "New Orleans, La",
      cover:
      "http://cdn1.theodysseyonline.com/files/2015/11/21/635837430566856627-1324495185_tndkklvnxeoprzcusexl.jpg",
      name: "Plot Your Own Path",
      type: "Choose Your Points of interest and Events."
    },
    {
      city: "New Orleans, La",
      cover:
      "https://www.orlandoinformer.com/wp-content/uploads/2011/08/port-of-entry-islands-of-adventure-725-oi.jpg",
      name: "Follow my footsteps",
      type: "Follow a Path Created by a fellow user"
    },
    {
      city: "New Orleans, La",
      cover:
      "https://www.orlandoinformer.com/wp-content/uploads/2011/08/port-of-entry-islands-of-adventure-725-oi.jpg",
      name: "LeI think Ill start here.",
      type: "Choose your starting point and let us handle the rest."
    }
  ],
  token: "",
  miles: 0
};

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return Object.assign({}, state, {
        user: action.User
      });
    case "SET_LOCATION":
      return Object.assign({}, state, {
        location: action.loc
      });
    case "SET_ADVENTURE":
      return Object.assign({}, state, {
        adventure: action.adv,
        CurrentStopIndex: 0,
        CurrentStop: action.adv.markerLocations[0]
      });
    case "SET_CURRENTSTOP":
      return Object.assign({}, state, {
        CurrentStop: action.stop,
        CurrentStopIndex: state.CurrentStopIndex + 1
      });
    case "Add_Photos":
      return Object.assign({}, state, {
        photo: action.photo
      });
    case "SET_GPS":
      return Object.assign({}, state, {
        gps: action.gps
      });
    case "SET_Markers":
      return Object.assign({}, state, {
        adventure: {
          markerLocations: state.adventure.markerLocations.concat(action.mark)
        }
      })
    case "ADD_BADGE":
      return Object.assign({}, state, {
        badges: state.badges.concat(
          action.badge
        )
      });
    case "SET_Token":
      return Object.assign({}, state, {
        token: action.token
      });
    case "SET_Adv_Counter":
      return Object.assign({}, state, {
        AdvCounter: action.advCounter
      });
    case "SET_Badges":
      return Object.assign({}, state, {
        badges: action.badges
      });
    case "SET_cities":
      return Object.assign({}, state, {
        cities: state.cities.concat(action.cities)
      });
    case "SET_miles":
      return Object.assign({}, state, {
        miles: state.miles + action.miles
      })
    default:
      return state;
  }
}
