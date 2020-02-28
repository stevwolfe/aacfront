import React from "react";
import { connect } from "react-redux";
import MainNavbar from "../home/MainNavbar";
import { fetchCurrentUser, noToken, fetchMembers, updateMembersFilteredList } from "../../redux/actions";
import SearchBar from './SearchBar'
import SearchMemberCard from './SearchMemberCard'
import '../../assets/search.css'
import '../../functions.js'
import { BeatLoader } from "react-spinners";
import Pagination from './Pagination'

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList : [],
      loading: false,
      cardsPerPage: 8,
      currentPost: [],
      currentPage: 1
    }
  }


  componentWillMount = () => {
    this.setState({loading:true})
    var pathName = window.location.href
    var hreff = pathName.split("#")
    if (hreff[1]) {
      this.setState({currentPage: hreff[1]})
    }

    if (this.props.currentUser.lookingPhotosMember || this.props.filterPhotos ) {
      let membersWithPhotos = this.props.showMembersSearch.filter(user => user.photos.length)
      this.setState({memberList: membersWithPhotos, currentPage: 1}, () => {
        const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
        const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
        const posts = this.state.memberList.slice(indexOfFirstCard, indexOfLastCard)
        this.setState({currentPost: posts})
      })
    }



  }

  componentDidMount = () => {
    if (this.props.currentUser && !this.props.showMembersSearch.length) {
      const minAge = this.props.currentUser.minAge
      const maxAge = this.props.currentUser.maxAge
      const userId = this.props.currentUser.id
      this.props.fetchMembers(minAge, maxAge,userId)
    } else if ((this.props.currentUser.lookingPhotosMember  || this.props.filterPhotos) && this.props.showMembersSearch.length && !(this.props.currentUser.lookingOnlineMember  || this.props.filterOnline)) {
        let membersWithPhotos = this.props.showMembersSearch.filter(user => user.photo)
        this.setState({memberList: membersWithPhotos, currentPage: 1}, () => {
          this.props.updateMembersFilteredList(membersWithPhotos)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = membersWithPhotos.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })
    } else if ((this.props.currentUser.lookingOnlineMember  || this.props.filterOnline) && this.props.showMembersSearch.length && this.props.showMembersSearch.length && !(this.props.currentUser.lookingPhotosMember  || this.props.filterPhotos)) {
      let membersOnline = this.props.showMembersSearch.filter(user => user.online)
      this.setState({memberList: membersOnline, currentPage: 1}, () => {
        this.props.updateMembersFilteredList(membersOnline)
        const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
        const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
        const posts = membersOnline.slice(indexOfFirstCard, indexOfLastCard)
        this.setState({currentPost: posts})
      })
    } else if ((this.props.currentUser.lookingOnlineMember  || this.props.filterOnline) && this.props.showMembersSearch.length && (this.props.currentUser.lookingPhotosMember  || this.props.filterPhotos)) {
      let membersOnline = this.props.showMembersSearch.filter(user => user.online)
      let membersWithPhotos = membersOnline.filter(user => user.photo)
      this.setState({memberList: membersWithPhotos, currentPage: 1}, () => {
        this.props.updateMembersFilteredList(membersWithPhotos)
        const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
        const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
        const posts = membersWithPhotos.slice(indexOfFirstCard, indexOfLastCard)
        this.setState({currentPost: posts})
      })
    } else {
      this.setState({memberList: this.props.showMembersSearch, currentPage: 1}, () => {
      this.props.updateMembersFilteredList(this.props.showMembersSearch)
      const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
      const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
      const posts = this.props.showMembersSearch.slice(indexOfFirstCard, indexOfLastCard)
      this.setState({currentPost: posts})
      })
    }

  };

  handleCurrentPosts(posts) {
    this.setState({currentPost: posts})
  }

  handleCurrentPosts = () => {
    const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
    const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
    const posts = this.handleCurrentPosts(this.state.memberList.slice(indexOfFirstCard, indexOfLastCard))
    this.setState({currentPost: posts})
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.filterOnline != this.props.filterOnline) {
      if (nextProps.filterOnline) {
        let membersOnline = this.props.membersFilteredList.filter(user => user.online)
        this.setState({memberList: membersOnline, currentPage: 1}, () => {
          this.props.updateMembersFilteredList(membersOnline)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = membersOnline.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })
      } else if (nextProps.filterPhotos) {
        let membersPhotos = this.props.showMembersSearch.filter(user => user.photos.length)
        this.setState({memberList: membersPhotos, currentPage: 1}, () => {
          this.props.updateMembersFilteredList(membersPhotos)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = membersPhotos.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })
      } else {
        this.setState({memberList: this.props.showMembersSearch}, () => {
          this.props.updateMembersFilteredList(this.props.showMembersSearch)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = this.props.showMembersSearch.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })

      }
    }

    if (nextProps.filterPhotos != this.props.filterPhotos) {
      if (nextProps.filterPhotos) {
        let membersPhotos = this.props.membersFilteredList.filter(user => user.photos.length)
        this.setState({memberList: membersPhotos, currentPage: 1}, () => {
          this.props.updateMembersFilteredList(membersPhotos)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = membersPhotos.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })
      
      } 
      // else if (this.props.filterByName) {
      //   let membersFilteredByName = this.props.membersFilteredList.filter(obj => obj.username.includes(nextProps.filterByName))
      //   let membersFilteredPhotos =   membersFilteredByName.filter(user => user.photos.length)
      //   this.props.updateMembersFilteredList(membersFilteredPhotos) 
      //   const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
      //   const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
      //   const posts = membersFilteredPhotos.slice(indexOfFirstCard, indexOfLastCard)
      //   this.setState({currentPost: posts})   

      // } 
      else if (nextProps.filterOnline) {
        let membersOnline = nextProps.showMembersSearch.filter(user => user.online)
        this.setState({memberList: membersOnline, currentPage: 1}, () => { 
          this.props.updateMembersFilteredList(membersOnline)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = membersOnline.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        }) }  else {
        this.setState({memberList: this.props.showMembersSearch}, () => {
          this.props.updateMembersFilteredList(this.props.showMembersSearch)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = this.props.showMembersSearch.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })

      }
    }


    if (nextProps.pageNumber != this.props.pageNumber) {
      this.setState({currentPage: nextProps.pageNumber}, () => {
        const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
        const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
        const posts = this.props.membersFilteredList.slice(indexOfFirstCard, indexOfLastCard)
        this.setState({currentPost: posts})
      })
    }

    if (nextProps.membersFilteredList != this.props.membersFilteredList && (nextProps.membersFilteredList.length != this.state.memberList.length)) {
      if (this.props.filterOnline) {

        let membersOnline = nextProps.membersFilteredList.filter(user => user.online)
        this.setState({memberList: membersOnline, currentPage: 1}, () => { 
          this.props.updateMembersFilteredList(membersOnline)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = membersOnline.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        }) 
      if (this.props.filterPhotos && (nextProps.membersFilteredList.length != this.state.memberList.length)) {
        let membersPhotos = this.props.showMembersSearch.filter(user => user.photos.length)
        let memberList = membersPhotos.filter(obj => obj.username.includes(nextProps.filterByName))
        this.setState({memberList: membersPhotos}, () => {
          this.props.updateMembersFilteredList(memberList)
          const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
          const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
          const posts = memberList.slice(indexOfFirstCard, indexOfLastCard)
          this.setState({currentPost: posts})
        })
      }       
      } else {
        this.setState({loading:false}, () => {
        const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
        const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
        const posts = this.props.membersFilteredList.slice(indexOfFirstCard, indexOfLastCard)
        this.setState({currentPost: posts})
        })
      }


    }

    if (this.props.showMembersSearch !=nextProps.showMembersSearch) {
      this.props.updateMembersFilteredList(nextProps.showMembersSearch)
    }

    if (this.props.filterByName != nextProps.filterByName) {

        let members = this.props.showMembersSearch
        let memberList = members.filter(obj => obj.username.includes(nextProps.filterByName))
        if (this.props.filterOnline) {
          let membersOnline = this.props.showMembersSearch.filter(user => user.online)
          let memberList = membersOnline.filter(obj => obj.username.includes(nextProps.filterByName))
          this.setState({memberList: memberList}, () => {
            this.props.updateMembersFilteredList(memberList)
            const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
            const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
            const posts = memberList.slice(indexOfFirstCard, indexOfLastCard)
            this.setState({currentPost: posts})
          })
        } else if(this.props.filterPhotos) {
          let membersPhotos = this.props.showMembersSearch.filter(user => user.photos.length)
          let memberList = membersPhotos.filter(obj => obj.username.includes(nextProps.filterByName))
          this.setState({memberList: membersPhotos}, () => {
            this.props.updateMembersFilteredList(memberList)
            const indexOfLastCard = this.state.currentPage * this.state.cardsPerPage
            const indexOfFirstCard = indexOfLastCard - this.state.cardsPerPage
            const posts = memberList.slice(indexOfFirstCard, indexOfLastCard)
            this.setState({currentPost: posts})
          })
        } else {
          this.setState({memberList: this.props.showMembersSearch}, () => {
            let memberList = this.props.showMembersSearch.filter(obj => obj.username.includes(nextProps.filterByName))
            this.props.updateMembersFilteredList(memberList)
          })
        }
      }
    // }
  }

  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render = () => {
    return (
      <div id="">
        <MainNavbar/>
        <SearchBar memberList={this.state.memberList}/>
        <div className="col-sm-10 col-sm-offset-1 homesearch">
          {
            this.props.membersFilteredList.length?
              this.state.currentPost.map(member => {
                  return <SearchMemberCard
                            photo={member.photo? member.photo: require('../../assets/blank-picture.png')}
                            firstName={member.username}
                            age={member.age}
                            id={member.id}
                            online={member.online}
                          />
                }):
              !this.state.loading?<div className='no-results'>
                <img src={require('../../assets/error.png')} />
                <p>Unfortunately we could not find anyone matching your criterias</p>
                <h5>Please review your filter or expand your research</h5>
              </div>:<div style={{display: 'flex', justifyContent: 'center'}}><BeatLoader /> </div>
          }
        </div>
        <div
          className="col-sm-6 col-sm-offset-3"
          style={{display: 'flex', justifyContent: 'center'}}
        >
          <Pagination
            cardsPerPage={this.state.cardsPerPage}
            totalPosts={this.props.membersFilteredList.length}
            paginate={this.paginate}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  loggedIn: state.isLoggedIn,
  currentUser: state.currentUser,
  showMembersSearch: state.showMembersSearch,
  filterByName: state.filterByName,
  filterOnline: state.filterOnline,
  filterPhotos: state.filterPhotos,
  pageNumber: state.pageNumber,
  membersFilteredList: state.membersFilteredList
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },
  noToken: () => {
    dispatch(noToken());
  },
  fetchMembers: (minAge, maxAge, userId) => {
    dispatch(fetchMembers(minAge, maxAge, userId))
  },
  updateMembersFilteredList: (list) => {
    dispatch(updateMembersFilteredList(list))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearch);
