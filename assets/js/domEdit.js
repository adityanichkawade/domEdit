(function ($) {
    var editorId = 'dom-edit-' + Date.now();
    var editorHTML = '<textarea id="' + editorId + '"></textarea>';
    var $editor = $(editorHTML);
    var $currentTargetElement = null;

    function preventDefaultEvents(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function getTargetElementBoundingRect($aTargetElement) {
        var offset = $aTargetElement.offset();
        return {
            left: offset.left,
            top: offset.top,
            width: $aTargetElement.outerWidth(),
            minHeight: $aTargetElement.outerHeight()
        };
    }


    function closeDomEditor(e) {
        $editor.remove();
        
        if ($currentTargetElement) {
            $currentTargetElement.html($editor.val());
        }

        $currentTargetElement = null;
        //$(document).off('click', closeDomEditor);
    }

    function editorClick(e) {
        preventDefaultEvents(e);
    }

    function setEditorStyle($element) {
        $editor.css(getTargetElementBoundingRect($element));
        
        $editor.css('font-size', $element.css('font-size'));
        $editor.css('font-weight', $element.css('font-weight'));
        $editor.css('text-align', $element.css('text-align'));
        $editor.css('font-family', $element.css('font-family'));
        $editor.css('position', 'absolute');
    }
    
    function setEditorState($element) {
        $editor.val($element.html());
        $editor.select();
        $editor.focus();
        $editor.click(editorClick);
        $editor.blur(closeDomEditor);
    }

    function targetElementDblClick(e) {
        preventDefaultEvents(e);
        var target = e.target;
        var $body = $(document.body);
    
        if (target === $editor[0] || target === document.body || !$body.has(target)) return;
        
        var $element = $(target);

        if (!$editor.parent().length) {
            $body.append($editor);
        }

        setEditorStyle($element);
        setEditorState($element);
        //$(document).on('click', closeDomEditor);
        $currentTargetElement = $element;
    }

    $.fn.domEdit = function (options) {
        var defaultOptions = {
            editorClass: ''
        }

        var opts = $.extend(defaultOptions, options);
        $editor.addClass(opts.editorClass);

        return this.each(function (idx, element) {
            $(element).dblclick(targetElementDblClick);
        });
    }
})(jQuery);