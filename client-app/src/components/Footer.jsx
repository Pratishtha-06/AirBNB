import React from "react";
import { Tabs,TabList,Tab,TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css'
import '../App.css';
import Panel from "./Panel";
import Panel2 from "./Panel2";


function Footer(){
    return (
        <>
        <div style={{backgroundColor:'#f2f2f2'}}>
         <h5 className="pt-5 ps-4 mb-4 mt-2">Inspiration for future getways</h5>

         <div className=" ps-2">
            <Tabs>
                <TabList>
                  <Tab style={{}}>Unique stays</Tab>
                  <Tab>Categories</Tab>
                </TabList>
                    <TabPanel>
                       <Panel/>
                    </TabPanel>
                    <TabPanel>
                       <Panel2/>
                    </TabPanel>
            </Tabs>
         </div>
        </div>
        </>
    )
}
export default Footer;