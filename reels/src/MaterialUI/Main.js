import React from 'react'
import Buttons from './Buttons'
import Navbar from './Navbar'
import Cards from './Cards'
import Form from './Form'
import bg from '../Images/background.jpg'
import AuthProvider from '../Context/AuthProvider';


function Main() {
    
        return (
                <div style={{ backgroundImage:`url(${bg})`,
                height:"100vh" }}>
        
                    <Navbar/>
                    <AuthProvider>
       <Form></Form>
     </AuthProvider>
                    {/* <Buttons/> */}
                {/* <Cards/> */}
            </div>
        )
    }
    
    export default Main
    
    
// import React from 'react';
// import bg from '../Images/background.jpg'
// // import car from './images/car.png'

// function Main() {
//     return (
//         <div  style={{ 
//             backgroundColor:'red' 
//             }}>
                
//       <h1>This is red car</h1>
//     </div>
//   );
// }

// export default Main;