import { Injectable } from '@angular/core';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  permissionGranted = false;

  constructor() { 
    this.checkPermission();
  }
  // Do you have permission to send a notification?
  checkPermission = async () => {
    this.permissionGranted = await isPermissionGranted();
    // If not we need to request it
    if (!this.permissionGranted) {
      const permission = await requestPermission();
      this.permissionGranted = permission === 'granted';
    }
  };

  // Once permission has been granted we can send the notification
  sendNotification = (title: string, body: string) => {
    if (this.permissionGranted) {
      sendNotification({title: title, body: body});
      this.playSound();
    }
  };

  // Play sound when notification is sent
  playSound = () => {
    const audio = new Audio('./../../assets/clock-alarm.mp3');
    audio.play();
  };
}
