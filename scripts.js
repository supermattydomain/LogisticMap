(function($) {
	function plot(imageData, x, r) {
		var i;
		var p = 0.5;
		// Iterate for a while, discarding points, to permit convergence
		for (i = 0; i < 1000; i++) {
			p = r * p * (1 - p);
		}
		// Now plot some points
		for (i = 0; i < imageData.height; i++) {
			var y = p * (imageData.height);
			setPixel(imageData, x, y, 0, 0, 0, 255);
			p = r * p * (1 - p);
		}
	}
	function drawBifurcationDiagram(bifurc, zoom) {
		var ctx = bifurc[0].getContext('2d');
		var imageData = ctx.getImageData(0, 0, bifurc.width(), bifurc.height());
		var rmin = 2.4, rmax = 4;
		var x;
		for (x = 1; x < bifurc.width(); x++) {
			var r = rmin + (rmax - rmin) * (x / bifurc.width());
			plot(imageData, x, r);
		}
		ctx.putImageData(imageData, 0, 0);
	}
	$(function() {
		var bifurc = $('#bifurc');
		var resizable = $('.resizable');
		bifurc.attr({width: bifurc.width(), height: bifurc.height()});
		var zoom = 1;
		resizable.resizable({ handles: "all", animate: false, ghost: true, autohide: false, aspectRatio: false });
        resizable.on('resizestop', function(event, ui) {
                bifurc.css({ width: '100%', height: '100%' });
                bifurc[0].width = bifurc.width();
                bifurc[0].height = bifurc.height();
        		drawBifurcationDiagram(bifurc, zoom);
        });
		drawBifurcationDiagram(bifurc, zoom);
	});
})(jQuery);
