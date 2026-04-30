package com.imagegalleryapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class DeviceDetailsPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext) =
        listOf(DeviceDetailsModule(reactContext))

    override fun createViewManagers(reactContext: ReactApplicationContext):
        List<ViewManager<*, *>> = emptyList()
}
