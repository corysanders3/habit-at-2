# Habit-at

## About
Habit-at allows users to track habit progress and consistency using 3D flower models for visualization. Habits are represented as flowers that grow or shrink based on how close the user follows their goals.

## Contributors
#### Front End Team
- [Cory Sanders](https://github.com/corysanders3)
- [Megan Crotteau](https://github.com/crotteau)
- [David Kwon](https://github.com/dkwon1223)
#### Back End Team - [BE repo](https://github.com/Habit-at-2311/be_habit_at)
- [Hoa Dam](https://github.com/hoadam)
- [Matt Darlington](https://github.com/mdarl17)  



## Preview
<img width="1678" alt="Screenshot 2024-05-19 at 9 15 08 PM" src="https://github.com/Habit-at-2311/fe-habit-at/assets/149750476/baeba9df-4ea3-4c6f-924d-1ba9f6b7e536">


## Technologies Used
<div>
  <img src='https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black' alt='react'/>
  <img src='https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black' alt='javascript'/>
  <img src='https://img.shields.io/badge/Three.js-000000.svg?style=for-the-badge&logo=threedotjs&logoColor=white' alt='Three.js'/>
  <img src='https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white' alt='react-router'/>
  <img src='https://img.shields.io/badge/Cypress-69D3A7.svg?style=for-the-badge&logo=Cypress&logoColor=white' alt='cypress'/>
  <img src='https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white' alt='Tailwind'/>
  <img src='https://img.shields.io/badge/CircleCI-343434.svg?style=for-the-badge&logo=CircleCI&logoColor=white' alt='CirclCi'/>
  <img src='https://img.shields.io/badge/Blender-E87D0D.svg?style=for-the-badge&logo=Blender&logoColor=white' alt='blender'/>
</div>  

Flower models were created by [Yashar](https://blendermarket.com/products/stylized-plants-pack).
## Cypress Testing
We used Cypress to implement E2E testing for this app. To run the tests:
- `git clone` this [repo](https://github.com/corysanders3/habit-at-2)
- `cd` into the directory
- `npm i` to install dependencies
- `npm start` and open http://localhost:3000 in your browser
- `npm run cypress:open` will start Cypress and open up test window
- click `E2E testing`
- when finished, `ctrl + c` to stop running local server

## Background
Habit-at is a final group project as students at Turing. The goal was to showcase the technologies we've learned and expand upon our knowledge through implenting new technologies. We used an agile process and gained experience working with both a front-end and back-end team. Our application uses CircleCI for continuous integration and deployment with the front-end being deployed on Heroku.

The application was also deployed on Vercel for its ease of use and increased memory limits. The deployed application can be found [here](https://habit-at-2.vercel.app/).

## Challenges and Wins
An initial hurdle was determining how to implement a 3D scene into our app and how to go about dynamically rendering flowers based on user input. We settled on using Three.js and React Three Fiber to load our scene, and we used React Spring to animate our flowers growth. Throughout this project, we implemented multiple libraries to streamline our code and while using them can simplify code, there was a large learning curve for understanding how to access and manipulate elements.

## Future Direction  
- User login with OAuth
- Enhancing flower models to show growth vs wilting
