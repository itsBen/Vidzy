module.exports.register = function($location, authentication) {
    var vm = this;
    vm.credentials = {
        name: '',
        email: '',
        password: '',
    };
    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
        vm.formError = '';
        if (!vm.credentials.name ||
            !vm.credentials.email ||
            !vm.credentials.password
        ) {
            vm.formError = 'All fields required, please try again';
            return false;
        } else {
            vm.doRegister();
        }
    };

    vm.doRegister = function () {
        vm.formError = '';
        authentication
            .register(vm.credentials)
            .error(function (err) {
                vm.formError = err;
            })
            .then(function () {
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
    };
};

module.exports.login = function($location, authentication) {
    var vm = this;

    vm.pageHeader = {
        title: 'Sign in to Vidzy',
    };

    vm.credentials = {
        email: '',
        password: '',
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
        vm.formError = '';
        if (!vm.credentials.email || !vm.credentials.password) {
            vm.formError = 'All fields required, please try again';
            return false;
        } else {
            vm.doLogin();
        }
    };

    vm.doLogin = function () {
        vm.formError = '';
        authentication
            .login(vm.credentials)
            .error(function (err) {
                vm.formError = err;
            })
            .then(function () {
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
    };
}