package com.ubb.bletracker;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.ubb.bachelor.blebackgroundscan.BleBackgroundScanPlugin;


public class MainActivity extends BridgeActivity {
  @Override
  public void OnCreate(Bundle savedInstanceState) {
    registerPlugin(BleBackgroundScanPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
