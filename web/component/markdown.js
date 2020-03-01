/**
 * Implements basic support for markdown - no sanitization, application is completely clientside.
 */
export default class MarkdownSupport {
    
    static render(template) {
        if (template) {
            template = MarkdownSupport._lists(template);
            template = MarkdownSupport._headers(template);
            template = MarkdownSupport._links(template);
            template = MarkdownSupport._code(template);
            template = MarkdownSupport._separator(template);
            template = MarkdownSupport._bold(template);
            template = MarkdownSupport._italics(template);
            template = MarkdownSupport._center(template);
            template = MarkdownSupport._color(template);
        }
        return template;
    }

    static _color(template) {
        for (let formatted of template.match(/(\[color:.+?\])(.|\n)*?(\[\/color\])/mg) || []) {
            let color = formatted.match(/(?:\[color:)(.+?)\]/)[1];
            let text = formatted.replace(/(\[color:.+?\])|(\[\/color\])/mg, '');
            template = template.replace(formatted, `<x style="color:${color};">${text}</x>`);
        }
        return template;
    }

    static _center(template) {
        for (let center of template.match(/(\[center\])(.|\n)*?(\[\/center\])/mg) || []) {
            let text = center;
            text = text.replace('[center]', '');
            text = text.replace('[/center]', '');
            template = template.replace(center, `<x style="color: inherit;display: block; text-align: center;">${text}</x>`);
        }
        return template;
    }

    static _bold(template) {
        for (let bold of template.match(/[_*]{2}.+?[_*]{2}/gm) || []) {
            let text = bold.match(/(?:[_*]{2})(.+)(?:[_*]{2})/)[1];
            template = template.replace(bold, `<b>${text}</b>`);
        }
        return template;
    }

    static _italics(template) {
        for (let italics of template.match(/[_*]{1}.+?[_*]{1}/gm) || []) {
            let text = italics.match(/(?:[_*]{1})(.+)(?:[_*]{1})/)[1];
            template = template.replace(italics, `<i>${text}</i>`);
        }
        return template;
    }

    static _separator(template) {
        for (let separator of template.match(/([*]{3}|[-]{3}|[_]{3})/gm) || []) {
            template = template.replace(separator, `<hr>`);
        }
        return template;
    }

    static _code(template) {
        for (let codes of template.match(/`((.|\n)+?)`/gm) || []) {
            let content = codes.match(/(?:`)((.|\n)+?)(?:`)/)[1];
            content = content.replace(/^\n/, '');
            content = MarkdownSupport._highlight(content);
            template = template.replace(codes, `<code ${content.match(/\n/g) ? 'class="block"' : ''}>${content}</code>`);
        }
        return template;
    }

    static _highlight(template) {
        for (let string of template.match(/".+"/mg) || []) {
            template = template.replace(string, `<span class="string">${string}</span>`)
        }
        for (let symbol of template.match(/[{};!?\(\)]/mg) || []) {
            template = template.replace(new RegExp(`\\${symbol}`, 'mg'), `<span class="symbol">${symbol}</span>`)
        }
        let keywords = 'function|void|constructor|static|if|while|when|for|else|return|break|let|var|const|true|false|public|private|final';
        for (let keyword of template.match(new RegExp(keywords, 'mg')) || []) {
            template = template.replace(new RegExp(keyword, 'mg'), `<span class="keyword">${keyword}</span>`);
        }
        for (let comment of template.match(/(\/\/.*)|(#.*)|([-]{2}.*)/mg) || []) {
            template = template.replace(comment, `<span class="comment">${comment}</span>`);
        }
        for (let annotation of template.match(/@.*/mg) || []) {
            template = template.replace(annotation, `<span class="annotation">${annotation}</span>`);
        }
        for (let number of template.match(/[0-9]+/mg) || []) {
            template = template.replace(number, `<span class="number">${number}</span>`);
        }
        return template;
    }

    static _lists(template) {
        return template.replace(/^(\* )/gm, "&emsp;&bullet;&nbsp;");
    }

    static _headers(template) {
        for (let header of template.match(/^(#+ ).*/gm) || []) {
            let level = (header.match(/#/gm) || []).length;
            template = template.replace(header, `<h${level} md>${header.replace(/#+ /mg, '')}</h${level}>`);
        }
        return template;
    }

    static _links(template) {
        for (let link of template.match(/!?\[[^\[\]]*?\]\(.+?\)/g) || []) {
            let url = link.match(/(?:\()(.*)(?:\))/)[1];
            let text = link.match(/(?:\[)(.*)(?:\])/)[1];
            let image = link[0] === '!';

            if (image) {
                template = template.replace(link, `<img src="${url}" alt="${text}">`);
            } else {
                template = template.replace(link, `<a href="${url}">${text}</a>`);
            }
        }
        return template;
    }
}