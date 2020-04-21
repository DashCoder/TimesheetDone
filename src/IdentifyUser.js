/* Description: Draft machine learning face recognition  */
/* Note: Currently works best with Firefox */

import React, { useState } from 'react';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import "@babel/polyfill";
//import { observer } from "mobx-react";
/* Machine learning -- see google's teachable-machine-boilerplate */
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

/* Number of classes to classify */
const NUM_CLASSES = 4;
/* Webcam Image size. Must be 227. */
const IMAGE_SIZE = 227;
/* K value for KNN */
const TOPK = 10;


class IdentityForm extends React.Component {
  
  lastPerson = {
    Name: ''
  };

  appState = this.props.appState;

  state = {
    cameraMessage: "Please look into camera and press button with your name"
  }
 
  componentDidMount(){
 
    /* Initiate variables */
    this.people = this.props.appState.people; 
    this.infoTexts = [];
    this.appState.training = -1; /* -1 when no class is being trained */
    this.videoPlaying = false;

    /* Initiate deeplearn.js math and knn classifier objects */
    this.bindPage();
    this.video = document.getElementById("cameraId");
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('playsinline', '');

    /* Create training buttons and info texts  */  
    for (let i = 0; i < NUM_CLASSES; i++) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.style.marginLeft = '40px';
      div.style.marginBottom = '10px';

      const userLabel = document.createElement('span')
      userLabel.innerText = this.people[i] + ": ";
      div.appendChild(userLabel);

      const infoText = document.createElement('span')
      infoText.innerText = " No examples added";
      div.appendChild(infoText);
      this.infoTexts.push(infoText);
    }

    /* Setup webcam */
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.width = IMAGE_SIZE;
        this.video.height = IMAGE_SIZE;

        this.video.addEventListener('playing', () => this.videoPlaying = true);
        this.video.addEventListener('paused', () => this.videoPlaying = false);
      })

  } /* end: componentDidMount */


  async bindPage() {
    this.knn = knnClassifier.create();
    this.mobilenet = await mobilenetModule.load();
    this.start();
  }

  start() {
    if (this.timer) {
      this.stop();
    }
    this.video.play();
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    this.video.pause();
    cancelAnimationFrame(this.timer);
  }


  async animate() {
    if (this.videoPlaying) {
     
      /* Get image data from video element */
      const image = tf.browser.fromPixels(this.video);

      let logits;
      /* 'conv_preds' is the logits activation of MobileNet. */
      const infer = () => this.mobilenet.infer(image, 'conv_preds');

      /* Train class if one of the buttons is held down */
      if (this.appState.training != -1) {
        logits = infer();

        /* Add current image to classifier */
        this.knn.addExample(logits, this.appState.training)
      }

      const numClasses = this.knn.getNumClasses();
      if (numClasses > 0) {

        /* If classes have been added run predict */
        logits = infer();
        const res = await this.knn.predictClass(logits, TOPK);

        for (let i = 0; i < NUM_CLASSES; i++) {

          /* The number of examples for each class */
          const exampleCount = this.knn.getClassExampleCount();

          /* Make the predicted class bold */
          if (res.classIndex == i) {
            this.infoTexts[i].style.fontWeight = 'bold';
          } else {
            this.infoTexts[i].style.fontWeight = 'normal';
          }

          /* Update info text */
          if (exampleCount[i] > 0) {
            this.infoTexts[i].innerText = ` ${exampleCount[i]} images - ${res.confidences[i] * 100}%`
            this.setState({infoText: JSON.stringify(this.infoTexts[i].innerText) });

            var confidence = res.confidences[i] * 100;
            if (confidence > 60) {
                
                this.setState({cameraMessage: 'Hello ' + this.people[i] }); 

                /* User changed - notify parent */
                if (this.lastPerson.Name != this.people[i]) {
                   this.props.idChangeHandler(this.people[i]);
                }

                this.lastPerson.Name = this.people[i];
       
            }


          }
        }
      }

      /* Dispose image when done */
      image.dispose();
      if (logits != null) {
        logits.dispose();
      }

    } /* Animate */
    this.timer = requestAnimationFrame(this.animate.bind(this));
 }


  render() {
    return (
      <div className="centerVideo">
        <h1>Identification Camera</h1>
        <video id="cameraId" />
        <p>{this.state.cameraMessage}</p>
        <p style={{color: this.appState.training > 0 ? "red" : "black"}}>{this.state.infoText}</p>
      </div>
    )
  }
};


IdentityForm.propTypes = {
  idChangeHandler: PropTypes.func.isRequired,
  appState: PropTypes.object
};

export default IdentityForm;