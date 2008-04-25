/*
 * Helma License Notice
 *
 * The contents of this file are subject to the Helma License
 * Version 2.0 (the "License"). You may not use this file except in
 * compliance with the License. A copy of the License is available at
 * http://adele.helma.org/download/helma/license.txt
 *
 * Copyright 2005 Hannes Wallnoefer. All Rights Reserved.
 */
package org.helma.javascript;

import org.mozilla.javascript.*;

import java.util.HashMap;

public class HelmaContextFactory extends ContextFactory {

    RhinoEngine engine;

    int languageVersion = 170;
    boolean strictMode = false;
    boolean warningAsError = false;
    int optimizationLevel = 0;
    boolean generatingDebug = true;
    ErrorReporter errorReporter;


    public HelmaContextFactory(RhinoEngine engine) {
        this.engine = engine;
        String optLevel = System.getProperty("rhino.optlevel");
        if (optLevel != null) {
            optimizationLevel = Integer.parseInt(optLevel);
        }
        String langVersion = System.getProperty("rhino.langversion");
        if (langVersion != null) {
            languageVersion = Integer.parseInt(langVersion);
        }
    }

    protected boolean hasFeature(Context cx, int featureIndex) {
        switch (featureIndex) {
          case Context.FEATURE_STRICT_VARS:
          case Context.FEATURE_STRICT_EVAL:
          case Context.FEATURE_STRICT_MODE:
            return strictMode;

          case Context.FEATURE_WARNING_AS_ERROR:
            return warningAsError;

          case Context. FEATURE_DYNAMIC_SCOPE:
              return true;
        }

        return super.hasFeature(cx, featureIndex);
    }

    protected void onContextCreated(Context cx) {
        super.onContextCreated(cx);
        cx.putThreadLocal("engine", engine);
        cx.putThreadLocal("modules", new HashMap());
        cx.setApplicationClassLoader(engine.loader);
        cx.setWrapFactory(engine.wrapFactory);
        cx.setLanguageVersion(languageVersion);
        cx.setOptimizationLevel(optimizationLevel);
        if (errorReporter != null) {
            cx.setErrorReporter(errorReporter);
        }
        cx.setGeneratingDebug(generatingDebug);
        super.onContextCreated(cx);
    }

    protected void onContextReleased(Context cx) {
        cx.removeThreadLocal("engine");
        cx.removeThreadLocal("modules");
        super.onContextReleased(cx);
    }


    public void setStrictMode(boolean flag)
    {
        checkNotSealed();
        this.strictMode = flag;
    }

    public void setWarningAsError(boolean flag)
    {
        checkNotSealed();
        this.warningAsError = flag;
    }

    public void setLanguageVersion(int version)
    {
        Context.checkLanguageVersion(version);
        checkNotSealed();
        this.languageVersion = version;
    }

    public void setOptimizationLevel(int optimizationLevel)
    {
        Context.checkOptimizationLevel(optimizationLevel);
        checkNotSealed();
        this.optimizationLevel = optimizationLevel;
    }

    public void setErrorReporter(ErrorReporter errorReporter)
    {
        if (errorReporter == null) throw new IllegalArgumentException();
        this.errorReporter = errorReporter;
    }

    public void setGeneratingDebug(boolean generatingDebug)
    {
        this.generatingDebug = generatingDebug;
    }

}