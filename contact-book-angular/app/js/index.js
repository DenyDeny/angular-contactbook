var myApp = angular.module("myApp", []);

myApp.controller("firstCtrl", function($scope) {
    // Сортировка и поиск в таблице
    $scope.sortType     = 'name';
    $scope.sortReverse  = false;
    $scope.searchContact   = ''; 

    // Массив объектов контактов
    // $scope.phonebook = [
    //   {fullname: 'Медведев Денис Эдуардович', phone: '89226021880', email: 'medvedev@test.com'},
    //   {fullname: 'Иванов Иван Иванович', phone: '6021880', email: 'ivanov@test.com'},
    //   {fullname: 'Петров Петр Петрович', phone: '880', email: 'petrov@test.com'}
    // ];
    $scope.getContactFromStorage = function(key, defaultValue) {
      var value = window.localStorage.getItem(key);

      var decoded = JSON.parse(value);

      if (decoded) {
          return decoded;
      }

      return false;
    };

    $scope.saveContactToStorage = function(key, value) {
      var arr = $scope.getContactFromStorage(key, value) || [];
      arr.push(value);
      window.localStorage.setItem(
          key, JSON.stringify(arr)
      )
    };

    $scope.phonebook = $scope.getContactFromStorage('phonebook') || []; 
    
    $scope.addContact = function(contact) {
      if (angular.isDefined(contact) && angular.isDefined(contact.fullname) && angular.isDefined(contact.phone)) {
        $scope.phonebook.push({
          fullname: contact.fullname,
          phone: contact.phone,
          email: contact.email
        }),
        $scope.saveContactToStorage('phonebook', contact);
        $scope.toggleModal();
        $scope.cleanModal(contact);
      } else {
        console.log('В каком то инпуте пусто!');
        console.log($scope.getContactFromStorage('phonebook'));
      }
    };

    // Очиска полей формы
    $scope.cleanModal = function(contact) {
      contact.fullname = '';
      contact.phone = '';
      contact.email = '';
    }

    // Модальное окно
    $scope.modalShown = false;
    $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
});

// Директива модального окна
myApp.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});