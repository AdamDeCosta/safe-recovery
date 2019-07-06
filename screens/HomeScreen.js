import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Carousel from '../components/Carousel';

const SECTIONS = [
  {
    content: `##Identify Opioid Overdose and Check for Response

**Ask** person if they are okay and shout name.

**Shake** shoulders and firmly rub the middle of their chest.

**Check for signs of opioid overdose:**

Will not wake up or respond to your voice or touch.

Breathing is very slow, irregular, or has stopped.

Center part of their eye is very small, sometimes called "pinpoint pupils"

Lay the person on their back to receive a dose of NARCAN Nasal Spray.
    `
  },
  {
    content: `## Give NARCAN Nasal Spray

**Remove** NARCAN Nasal Spray from the box then peel back the tab with the circle to open the NARCAN Nasal Spray.

**Hold** the NARCAN Nasal spray with your thumb on the bottom of the plunger and your first and middle fingers on either side of the nozzle.

**Gently insert the tip of the nozzle into either nostril.**

* Tilt the person's head back and provide support under the neck with your hand. Gently insert the tip of the nozzle into one nostril, until your fingers on either side of the nozzle are against the bottom of the person's nose.

**Press the plunger firmly** to give the dose of NARCAN Nasal Spray.

* Remove the NARCAN Nasal Spray from the nostril after giving the dose.`
  },
  {
    content: `## Call for emergency medical help, Evaluate and Support

**Get emergency medical help right away.**

**Move the person on their side (recovery position)** after giving NARCAN Nasal Spray.

**Watch the person closely.**

**If the person does not respond** by waking up to voice or touch, or breathing normally another dose may be given. NARCAN Nasal Spray may be dosed every 2 to 3 minutes, if available.

**Repeat Step 2 using a new NARCAN Nasal Spray to give another dose in the other nostril.**

If additional NARCAN NAsal Sprays are available, repeat step 2 every 2 to 3 minutes until the person responds or emergency medical help is received.`
  }
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <Carousel pages={SECTIONS} />;
  }
}
