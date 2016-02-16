Template.newPost.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.newPost.onRendered(function(){
  $('#summernote').summernote({
    height: 350,
    focus: true
  });
});

Template.newPost.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.newPost.events({
  "click #submit-post": function(event,template) {
    event.preventDefault();
    template.error.set('');
    
    var post = {
      title: $('input[name=title]').val().trim(),
      tag: $('input[name=tag]').val().trim(),
      body: $('#summernote').summernote('code')
    };
    Meteor.call('newPost', post, function(error,result) {
      if (error) {
        template.error.set(error.reason);
      }else {
            Router.go('singlePost',{_id: result._id});
      }
    });
    document.getElementById("new-post").reset();
  }
});
