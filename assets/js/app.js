$(document).ready(function(){
    $('body').domEdit({
        editorClass: 'editor',
        onSetEditorStyle: function($editor, $editingElement) {
            $editor.css('border-style', 'dotted');
            $editor.css('border-width', '1px');  
            $editor.css('outline', 'none');
        }
    });
});