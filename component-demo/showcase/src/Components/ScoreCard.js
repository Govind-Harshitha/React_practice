import React, { Component } from "react";
import Hero from "@pxblue/react-components/core/Hero";
import HeroBanner from "@pxblue/react-components/core/HeroBanner";
import InfoListItem from "@pxblue/react-components/core/InfoListItem";
import ScoreCard from "@pxblue/react-components/core/ScoreCard";
import { withStyles } from "@material-ui/core/styles";
import "./ScoreCard.css";

import {
  List,
  Card,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid
} from "@material-ui/core";
import { ChevronRight, MoreVert } from "@material-ui/icons";
import * as Colors from "@pxblue/colors";
import {
  GasCylinder,
  Temp,
  Flow,
  Moisture as Humidity
} from "@pxblue/icons-mui";
import {
  CloudCircle,
  NotificationsActive,
  Notifications,
  Info
} from "@material-ui/icons";
import top from "../topology_40.png";
import { makeStyles } from "@material-ui/core/styles";

const Icons = {
   temperature: {
    Icon: (
      <Temp fontSize={"inherit"} htmlColor={Colors.black[500]} />
    ),
    unit: "°F"
  },
  flow: {
   
    Icon: (
      <Flow fontSize={"inherit"} htmlColor={Colors.black[500]} />
    ),
  
    unit: "KSCFH"
  },
  humidity: {
    Icon: (
      <Humidity
        fontSize={"inherit"}
        // htmlColor={
        //   eventCount > 0 ? Colors.blue[500] : Colors.black[500]
        // }
      />
    ),
    unit: "%"
  },
  gasCylinder: {
    Icon: (
      <GasCylinder
        fontSize={"inherit"}
        // htmlColor={
        //   eventCount > 0 ? Colors.blue[500] : Colors.black[500]
        // }
      />
    ),
    unit: "KSCF"
  },
  cloud: {
    Icon: <CloudCircle color={"inherit"} />
  },
  Info: {
    Icon: <Info color={"inherit"} />
  },
  Notification: {
    notificationInActive: (
      <Notifications style={{ color: "grey" }}></Notifications>
    ),
    notificationActive: (
      <NotificationsActive
        style={{ color: "red" }}
      ></NotificationsActive>
    )
  },
  chevron: {
    Icon: <ChevronRight />
  }
};

const fetchIcon=value=>{
  switch(value){
    case 'temperature':return Icons.temperature.Icon;
    case 'flow':return Icons.flow.Icon;
    case 'humidity':return Icons.humidity.Icon;
    case 'gasCylinder':return Icons.gasCylinder.Icon;
  }
}
const fetchUnit=value=>{
  switch(value){
    case 'temperature':return Icons.temperature.unit;
    case 'flow':return Icons.flow.unit;
    case 'humidity':return Icons.humidity.unit;
    case 'gasCylinder':return Icons.gasCylinder.unit;
  }
}
const HeroView=(eventCount,dataValue)=>{

  var temp;
  var heroObj=[];
  console.log(dataValue)
  return Object.keys(dataValue).map((key,index)=>{
 
    return (
      <Hero
      icon={
        fetchIcon(key)  
      
      }
      htmlColor={
        eventCount > 0 ? Colors.blue[500] : Colors.black[500]
      }  
      label={key}
      value={dataValue[key]}
      units={  
        fetchUnit(key)    
      }
      iconSize={48}
      fontSize={"normal"}
    />
    
    )
  })


};



const scorecard = (props)=>{
  
    const data = props.scoreCardData;
    console.log(data);
    return (
      
      <Grid container className="score-card-grid">
        <div
          style={{
            display: "flex",
            maxWidth: "1200px",
            flexWrap: "wrap",
            margin: " 0 auto"
          }}
        >
          {data.map((scoreCardData, i) => {
            const {
              title,
              alarmCount,
              subtitle,
              deviceCount,
              eventCount,
              commStatus,
              values
            } = scoreCardData;
            const dataValues = Object.keys(scoreCardData.values);
          
            return (
              <Grid
                item
                style={{ padding: 5 }}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                cols={3}
              >
                <ScoreCard
                  style={{ maxWidth: 400 }}
                  headerColor={
                    alarmCount > 0 ? Colors.blue[500] : Colors.red[500]
                  }
                  headerBackgroundImage={top}
                  headerTitle={title}
                  headerSubtitle={subtitle}
                  headerInfo={deviceCount!==null?deviceCount + " Devices":0+ " Devices"}
                  headerFontColor={Colors.white[50]}
                  actionItems={[
                    <MoreVert onClick={() => alert("something did")} />
                  ]}
                  badge={
                    
                    <HeroBanner>
                        {HeroView(eventCount,values)}
                    </HeroBanner>
                  }
                  badgeOffset={0}
                  actionRow={
                    <List style={{ margin: 0 }}>
                      <ListItem>
                        <ListItemText primary="View Location" />
                        <ListItemSecondaryAction>
                          {" "}
                          {Icons.chevron.Icon}{" "}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  }
                >
                  <List style={{ padding: "10px 0" }}>
                    <InfoListItem
                      dense
                      style={{ height: 36 }}
                      fontColor={
                        scoreCardData.alarmCount
                          ? Colors.red[500]
                          : Colors.black[100]
                      }
                      iconColor={
                        scoreCardData.alarmCount
                          ? Colors.red[500]
                          : Colors.black[100]
                      }
                      title={
                        scoreCardData.alarmCount !== null
                          ? scoreCardData.alarmCount + " Alarm"
                          : 0 + " Alarm"
                      }
                      icon={
                        scoreCardData.alarmCount <= 0 ||
                        scoreCardData.alarmCount === null
                          ? Icons.Notification.notificationInActive
                          : Icons.Notification.notificationActive
                      }
                    />
                    <InfoListItem
                      dense
                      style={{ height: 32 }}
                      fontColor={
                        eventCount ? Colors.red[500] : Colors.black[100]
                      }
                      iconColor={
                        eventCount ? Colors.red[500] : Colors.black[100]
                      }
                      title={
                        eventCount !== null
                          ? eventCount + " Event"
                          : 0 + " Event"
                      }
                      icon={<Info color={"inherit"} />}
                    />
                    <InfoListItem
                      dense
                      style={{ height: 36 }}
                      title={commStatus}
                      icon={Icons.cloud.Icon}
                    />
                  </List>
                </ScoreCard>
              </Grid>
            );
          })}
        </div>
      </Grid>
    );
  }

  // withStyles(useStyles)
export default (scorecard);
