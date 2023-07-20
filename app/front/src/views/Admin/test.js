
const Webflow = window.Webflow || []; Webflow.push(function(){

    // USER CONFIGURATION
    // ==================

    // Enter the class names of your styled page number links
    const linkClassName = 'page-link';
    const currentClassName = 'current-page';
    const totalCountItem = $('.c-ref_item').length;



    // Set the max range of page numbers to show (false or integer)
    const maxPageCount = 9;

    // PAGINATION MAGIC (DON'T EDIT)
    // =============================
    $('.w-page-count').each(function(){
        const collectionUrl = $(this).closest('.w-pagination-wrapper').find('[class*="w-pagination"]').first().prop('href').split('=')[0];
        const totalPageCount = parseInt(/[^/]*$/.exec($(this).text())[0].trim());
        const currentPageNumber = parseInt($(this).text().split('/')[0].trim())

        let pageCount = maxPageCount || totalPageCount;
        const pagesToDisplay = Math.max(1, Math.min(pageCount, totalPageCount));
        const middlePageNumber = Math.ceil((pagesToDisplay - 1) / 2);
        const endingPageNumber = Math.min(Math.max(1, currentPageNumber - middlePageNumber) + (pagesToDisplay - 1), totalPageCount);
        const startingPageNumber = endingPageNumber - (pagesToDisplay - 1);

        $(this).empty();

        for (let i = startingPageNumber; i <= endingPageNumber; i++) {
            let pageNumber = i;
            let pageLink = collectionUrl + '=' + pageNumber;
            let isCurrentPage = pageNumber == currentPageNumber;
            const $anchor = $('<a>', {
                class: [isCurrentPage && currentClassName, linkClassName].filter(a => a).join(' '),
                href: pageLink,
                text: pageNumber,
            });
            $(this).append($anchor);
        }

    });


    var currentPage = getParameterByName("03f80677_page");

    if (isNaN(currentPage) || currentPage == null) {
        currentPage = 1;
    }

    var arrow_left = $('.pagination__spacer').first();
    var arrow_right = $('.pagination__spacer').last()

    var maxCount = Math.ceil(totalCountItem / 9);


    if (currentPage == 1) {
        arrow_left.css('display','none');
        arrow_right.css('display','flex');
    } else if(currentPage == maxCount) {
        arrow_right.css('display','none');
    }else{
        arrow_left.css('display','flex');
        arrow_right.css('display','flex');
    }

    var more = parseInt(currentPage) + 1;
    var less = parseInt(currentPage) - 1;


    $('.pagination__button').first().attr('href', 'https://dotline.webflow.io/references?03f80677_page='+ parseInt(less));
    $('.pagination__button').last().attr('href', 'https://dotline.webflow.io/references?03f80677_page='+ parseInt(more));
});



const totalCountItem = $('.c-ref_item').length;

if(totalCountItem.length < 9){
    $('.w-pagination-wrapper').css('display', 'none');
}else{
    $('.w-pagination-wrapper').css('display', 'flex');
}


function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

