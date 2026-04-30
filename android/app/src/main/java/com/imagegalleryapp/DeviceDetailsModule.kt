package com.imagegalleryapp

import android.os.Build
import com.facebook.react.bridge.*

class DeviceDetailsModule(reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "DeviceDetails"

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        val map = Arguments.createMap().apply {
            putString("brand", Build.BRAND)
            putString("model", Build.MODEL)
            putString("systemVersion", Build.VERSION.RELEASE)
            putInt("sdkVersion", Build.VERSION.SDK_INT)
            putString("device", Build.DEVICE)
            putString("manufacturer", Build.MANUFACTURER)
        }
        promise.resolve(map)
    }
}
