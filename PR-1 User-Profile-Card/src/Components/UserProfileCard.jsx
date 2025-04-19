import React from "react";
import "./Card.css";

class UserProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="profile-card">
          <div class="profile-img">
            <img src={this.props.images} alt="Profile Picture" />
          </div>
          <h1>{this.props.profileNames}</h1>
          <p class="title">{this.props.study}</p>
          <p class="location">{this.props.location}</p>

          <div class="info">
            <h5>🎓{this.props.universityName}</h5>
            <h5>📸 {this.props.username}</h5>
            <h5>🌐 {this.props.webname}</h5>
          </div>

          <div class="skills">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
          </div>

          <div class="actions">
            <button class="btn">Message</button>
            <button class="btn">Portfolio</button>
            <button class="btn">Follow</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileCard;
