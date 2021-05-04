# Bestbuy-Geolocation-App-BizHacks 📲
![bestbuylogo](https://user-images.githubusercontent.com/53579064/116971245-20b45000-ac6e-11eb-91e1-802dec09e01b.PNG)

## Table of Contents
- [Description](#description)  
- [Technologies Used](#technologies-used)
- [Demo](#how-it-works)
- [Roles](#teammates)

## Description 

At this 24 hours Hackathon, our team won 🏆**1st Place** out of 100 other people in **BizHacks2021**! We looked at how to geo detect a customer who has arrived for at Best Buy for pick up? We focused on increasing customer satisfaction by improving curbside pickup through scheduling and geo detection to solve two main issues:

1. Customers need to wait a long time for curbside pickup causing inconsistent wait times.
2. Staffs are shorthanded due to surges of customer pickups during rush hours, causing increased wait times.

We implemented a mobile app and web app trying to address these issues by:
1. Provide software features to schedule pickups by time slots
2. Customers can enable geo services for curbside pickups when they are heading to a store
3. Staffs can view a queue of customers in transit to the store and their estimated arrival times

## Technologies Used

* **Frontend:** CSS, React.js, React Native
* **Backend:** Node.js, Express.js
* **Dependencies** Axios, SendGrid

## Demo Interfaces
1.User select the order they want to pick up via mobile app, they will be redirected next screen where they can either **enable their geolocation** or **manually input time to arrive at store**

<img src="mobile_frontend\assets\app1.png" alt="drawing" width="300" height="600"/> <img src="mobile_frontend\assets\2.png" alt="drawing" width="300" height="600"/><img src="mobile_frontend\assets\3.jpg" alt="drawing" width="300" height="600"/><img src="mobile_frontend\assets\4.png" alt="drawing" width="300" height="600"/>

2.The frontend web app will be updated with arriving user's information if they manually inputted 15 minutes or less on the mobile app or if they are within 15 from designated Bestbuy location. The frontend web app is meant for staff's to look at incoming customers and prepare item ahead of time.

<img src="web_frontend\query.png" alt="drawing" width="900"/>

## Teammates
* Miki Y
* Corbyn K
* Scott L
* Brandon S
* Wayne Y

## Inspiration for Geolocation Curbside Pickup

Our team spent 6 hours brainstorming and assessing the different cases provided by BestBuy. We decided to allocate our working time efficiently by tackling a problem that is not as complicated but make sure to get our application working as a starter. 
