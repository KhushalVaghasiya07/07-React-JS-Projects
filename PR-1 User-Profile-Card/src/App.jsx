import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserProfileCard from "./Components/UserProfileCard";
import image1 from "./assets/DJsevni.jpg"
import image2 from "./assets/Henil.png"
import image3 from "./assets/Jenish.jpg"
import image4 from "./assets/Khushal.jpg"
import image5 from "./assets/Yogesh.jpg"
import image6 from "./assets/Vishal.jpg"

function App() {
  return (
    
    <div class="Profile-card">
      <div className="container">
        <div className="row user-card">
          <UserProfileCard
            images = {image1}
            profileNames="Vivek Prajapati"
            location="Sevni , Surat"
            study="Dj Operatpr , Web devloper"
            universityName="Swarnim Start-up and Innovation University"
            username="@vk_edz"
            webname="www.khushal.com"
            
          />
          <UserProfileCard
            images = {image2}
            profileNames="Henil Rakholiya"
            study="Fullstack Web-Devlpoer"
            universityName="Swarnim Start-up and Innovation University"
            username="@bhano_07"
            webname="www.Henil.com"
            
            location="Laskana , Surat"
          />
          <UserProfileCard
            images = {image3}
            profileNames="Jenish Hariyani"
            study="Fullstack Web-Devlpoer"
            universityName="Swarnim Start-up and Innovation University"
            username="@jenish_07"
            webname="www.Jenish.com"
            
            location="Kamrej , Surat"
          />
          <UserProfileCard
            images = {image4}
            profileNames="Khushal Vaghasiya"
            study="Fullstack Web-Devlpoer"
            universityName="Swarnim Start-up and Innovation University"
            username="@vk_edz"
            webname="www.khushal.com"
            
            location="Sarthana , Surat"
          />
          <UserProfileCard
            images = {image5}
            profileNames="Yogesh Rathod"
            study="Fullstack Web-Devlpoer"
            universityName="Shree Sicence Parekh Collage , Mahuva"
            username="@Yogesh_07"
            webname="www.Yogesh.com"
            
            location="Chikuvadi , Surat"
          />
          <UserProfileCard
            images = {image6}
            profileNames="Vishal Solanki"
            study="Fullstack Web-Devlpoer"
            universityName="Swarnim Start-up and Innovation University"
            username="@Vishalo_07"
            webname="www.Vishal.com"
            
            location="Sarthana , Surat"
          />
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
