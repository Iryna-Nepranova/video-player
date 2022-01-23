let $form = $('#search-form');
let $carousel = $('#carousel');
let $carousInner = $('.carousel-inner');
let $prev = $('.carousel-control-prev');
let $next = $('.carousel-control-next');
let video = [];


function getVideos(term) {
    $.get('https://itunes.apple.com/search?limit=10&entity=musicVideo', { term })
        .done((response) => createCarousel(JSON.parse(response).results))
        .fail((error) => console.log(error));
};

$form.on('submit', (event) => {
    event.preventDefault();
    const term = $('input').val();

    if (term.trim()) {
        getVideos(term);
    }
});

function createCarousel(data) {
    $carousInner.empty();
    $('.carousel').carousel({ interval: 0 });
    data.forEach((item) => {
        $('<div>')
            .addClass('carousel-item')
            .append(
                $('<video>')
                .attr('controls', 'controls')
                .attr('src', item.previewUrl))
            .appendTo($carousInner);

        $carousel.find('.carousel-item')
            .first().addClass('active');

        $carousel.on('click', '.carousel-control-prev', function(event) {
            event.preventDefault();
            $carousel.carousel('prev')
            $carousel.find('video').trigger('pause');
            setTimeout(() => $carousel.find('.active video').trigger('play'), 1000);
        });

        $carousel.on('click', '.carousel-control-next', function(event) {
            event.preventDefault();
            $carousel.carousel('next')
            $carousel.find('video').trigger('pause');
            setTimeout(() => $carousel.find('.active video').trigger('play'), 1000);

        });
    })
}