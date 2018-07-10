function loginTemplate(){
    return `
    <div id="loading">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
    <div class="center-vertical">
    <div class="center-content row">

        <form onSubmit="loginProceedHandler()" id="login-form" class="col-md-4 col-sm-5 col-xs-11 col-lg-3 center-margin" method="">
            <h3 class="text-center pad25B font-gray text-transform-upr font-size-23">Monarch Admin <span class="opacity-80">v1.0</span></h3>
            <div id="login-form" class="content-box bg-default">
                <div class="content-box-wrapper pad20A">
                    <img class="mrg25B center-margin radius-all-100 display-block" src="assets/image-resources/gravatar.jpg" alt="">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon addon-inside bg-gray">
                                <i class="glyph-icon icon-envelope-o"></i>
                            </span>
                            <input name="username" type="text" class="form-control" id="username" placeholder="Username" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon addon-inside bg-gray">
                                <i class="glyph-icon icon-unlock-alt"></i>
                            </span>
                            <input name="password" type="password" class="form-control" id="password" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-block btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </form>

    </div>
</div>
`
}
