var voronoi = false;
			var delaunay = false;
			var canv = null;
			var colors = [];
		
			function onLoad()
			{
				canv = document.getElementById("c");
				canv.onmousemove = onMM;
				canv.onclick = onClick;
				c = canv.getContext("2d");
				w = canv.width = window.innerWidth;
				h = canv.height = window.innerHeight;
				points = [];
				v = new Voronoi();
				
				for(i=0; i<10; i++)
				{
					points.push(new Point(Math.random()*w, Math.random()*h));
					colors.push(rndCol());
				}
					
				redraw();
			}
			
			function onMM(e)
			{
				var last = points[points.length-1];
				last.x = mouseX(e);
				last.y = mouseY(e);
				redraw();
			}
			
			function onClick(e)
			{
				var last = points[points.length-1];
				last.x += Math.random();
				last.y += Math.random();
				points.push( new Point(mouseX(e), mouseY(e)));
				colors.push(rndCol());
			}

			function resetPoints()
			{
				points = [points[points.length-1]];
				redraw();
			}

			function randPoints(){
				for(i=0;i<10;i++){
					points.push(new Point(Math.random()*w, Math.random()*h));
					colors.push(rndCol())
					redraw();
				}
			}
			
			function redraw()
			{
				c.fillStyle = "#ffffff";
				c.fillRect (0, 0, w, h);
				
				v.Compute(points, w, h);
				edges = v.GetEdges();
				cells = v.GetCells();
				
				/* TODO THIS IS FOR SHADING IN THE CELLS
				for(var i=0; i<cells.length; i++)
				{
					var p = cells[i].vertices;
					if(p.length == 0) continue;
					if(p.length == 4)
					{
						console.log(cells[i].vs);
						console.log(p);
					}
					c.fillStyle = colors[i];
					c.beginPath();
					c.moveTo(p[0].x, p[0].y);
					for(var j=1; j<p.length; j++) c.lineTo(p[j].x, p[j].y);
					c.closePath();
					c.fill();
				}
				*/
								
				if(delaunay)
				{
					c.lineWidth = 3;
					c.strokeStyle = "#888888";
					for(i=0; i<edges.length; i++)
					{
						var e = edges[i];
						c.beginPath();
						c.moveTo(e.left.x, e.left.y);
						c.lineTo(e.right.x, e.right.y);
						c.closePath();
						c.stroke();
					}
				}
				
				if(voronoi)
				{
					c.lineWidth = 5;
					c.strokeStyle = "#000";
					for(i=0; i<edges.length; i++)
					{
						var e = edges[i];
						c.beginPath();
						c.moveTo(e.start.x, e.start.y);
						c.lineTo(e.end.x, e.end.y);
						c.closePath();
						c.stroke();
					}
				}
				
				c.fillStyle = "rgb(255,0,0)";
				for(i=0; i<points.length; i++)
				{
					var p = points[i];
					c.beginPath();
					c.arc(p.x, p.y, 6, 0, Math.PI*2, true);
					c.closePath();
					c.fill();
				}
			}
			function rndCol() {
				var letters = '0123456789ABCDEF'.split('');
				var color = '#';
				for (var i = 0; i < 6; i++ ) {
					color += letters[Math.round(Math.random() * 15)];
				}
				return color;
			}
function Point(x, y)
{
	this.x = x;
	this.y = y;
}

Point.prototype.distance = function(a, b)
{
   return(Math.sqrt( (b.x-a.x)*(b.x-a.x) + (b.y-a.y)*(b.y-a.y) ));
}



function VEdge(s, a, b)		// start, left, right
{
	this.left = a;		// point on left
	this.right = b;		// point on right
	
	this.start = s;		// start point
	this.end = null;	// end point
	
	this.f = (b.x - a.x) / (a.y - b.y);
	this.g = s.y - this.f*s.x;
	this.direction = new Point(b.y-a.y, -(b.x - a.x));
	this.B = new Point(s.x+this.direction.x, s.y + this.direction.y);	// second point of line
	
	this.intersected = false;
	this.iCounted = false;
	
	this.neighbour = null;
}



function VEvent(p, pe)
{
	this.point = p;
	this.pe = pe;
	this.y = p.y;
	this.key = Math.random()*100000000;
	
	this.arch = null;
	this.value = 0;
}

VEvent.prototype.compare = function(other)
{
	return((this.y>other.y)?1:-1);
}



function VParabola(s)
{
	this.cEvent = null;
	this.parent = null;
	this._left = null;
	this._right = null;
	

	this.site = s;
	this.isLeaf = (this.site != null);
}

VParabola.prototype = {
    get left(){
        return this._left;
    },
    get right(){
        return this._right;
    },
	
	set left(p){
        this._left = p;
		p.parent = this;
    },
    set right(p){
        this._right = p;
		p.parent = this;
    }
};


function VQueue()
{
	this.q = new Array();
	this.i = 0;
}

function sortOnY(a, b)
{
	return (a.y > b.y)?1:-1 ;
}

VQueue.prototype.enqueue = function(p)
{
	this.q.push(p);
}

VQueue.prototype.dequeue = function()
{
	this.q.sort(sortOnY);
	return this.q.pop();
}

VQueue.prototype.remove = function(e)
{
	var index = -1;
	for(this.i=0; this.i<this.q.length; this.i++)
	{
		if(this.q[this.i]==e){ index = this.i; break; }
	}
	this.q.splice(index, 1);
}

VQueue.prototype.isEmpty = function()
{
	return (this.q.length==0);
}

VQueue.prototype.clear = function(b)
{
	this.q = [];
}



// counter clock wise
// (-1,1), (1,1), (1,-1), (-1,-1)

function VPolygon()
{
	this.size = 0;
	this.vertices = [];
	this.first = null;
	this.last = null;
}

VPolygon.prototype.addRight = function(p)
{
	this.vertices.push(p);
	++this.size;
	this.last = p;
	if(this.size==1) this.first = p;
}

VPolygon.prototype.addLeft  = function(p)
{
	var vs = this.vertices;
	this.vertices = [p];
	for(var i=0; i<vs.length; i++) 
		this.vertices.push(vs[i]);
		
	++this.size;
	this.first = p;
	if(this.size==1) this.last = p;
}

function Voronoi()
{
	with(this)
	{
		this.places = null;
		this.edges = null;
		this.cells = null;
		this.queue = new VQueue;
		
		this.width = 0;
		this.heght = 0;
		this.root = null;
		this.ly = 0;
		this.lasty = 0;
		this.fp = null;
	}
}

Voronoi.prototype.Compute = function(p, width, height)
{
	if(p.length<2) return [];

	this.root = null;
	this.places = p;
	this.edges = [];
	this.cells = [];
	this.width = width;
	this.height = height;
	
	this.queue.clear(true);
	
	for(i=0; i<this.places.length; i++)
	{
		var ev = new VEvent(this.places[i], true);
		var cell = new VPolygon();
		this.places[i].cell = cell;
		this.queue.enqueue(ev);
		this.cells.push(cell);
	}
	
	var lasty = Number.MAX_VALUE;
	var num = 0;
	while(!this.queue.isEmpty())
	{
		var e = this.queue.dequeue();  
		this.ly = e.point.y;
		if(e.pe) this.InsertParabola(e.point);
		else this.RemoveParabola(e);
		
		this.lasty = e.y;
	}
	this.FinishEdge(this.root);
	
	for(i=0; i<this.edges.length; i++)
		if(this.edges[i].neighbour) this.edges[i].start = this.edges[i].neighbour.end;
}

Voronoi.prototype.GetEdges = function()
{
	return this.edges;
}

Voronoi.prototype.GetCells = function()
{
	return this.cells;
}

// M E T H O D S   F O R   W O R K   W I T H   T R E E -------
		
Voronoi.prototype.InsertParabola = function(p)
{
	if(!this.root){this.root = new VParabola(p); this.fp = p; return;}
	
	if(this.root.isLeaf && this.root.site.y - p.y <0.01)	
	{
		this.root.isLeaf = false;
		this.root.left = new VParabola(this.fp);
		this.root.right = new VParabola(p);
		var s = new Point((p.x+this.fp.x)/2, this.height);
		if(p.x>this.fp.x) this.root.edge = new VEdge(s, this.fp, p);
		else this.root.edge = new VEdge(s, p, this.fp);
		this.edges.push(this.root.edge);
		return;
	}
	
	var par = this.GetParabolaByX(p.x);
	
	if(par.cEvent)
	{
		this.queue.remove(par.cEvent);
		par.cEvent = null;
	}

	var start = new Point(p.x, this.GetY(par.site, p.x));
	
	var el = new VEdge(start, par.site, p);
	var er = new VEdge(start, p, par.site);
	
	el.neighbour = er;
	this.edges.push(el);
	
	par.edge = er;
	par.isLeaf = false;
	
	var p0 = new VParabola(par.site);
	var p1 = new VParabola(p);
	var p2 = new VParabola(par.site);
	
	par.right = p2;
	par.left = new VParabola();
	par.left.edge = el;

	par.left.left = p0;
	par.left.right = p1;
	
	this.CheckCircle(p0);
	this.CheckCircle(p2);
}
		
Voronoi.prototype.RemoveParabola = function(e)
{						
	var p1 = e.arch;
	
	var xl = this.GetLeftParent(p1);
	var xr = this.GetRightParent(p1);
		
	var p0 = this.GetLeftChild(xl);
	var p2 = this.GetRightChild(xr);
	
	if(p0.cEvent){this.queue.remove(p0.cEvent); p0.cEvent = null;}
	if(p2.cEvent){this.queue.remove(p2.cEvent); p2.cEvent = null;}
				
	var p = new Point(e.point.x, this.GetY(p1.site, e.point.x));

	
	if(p0.site.cell.last == p1.site.cell.first ) p1.site.cell.addLeft(p);
	else p1.site.cell.addRight(p);
	
	p0.site.cell.addRight(p);
	p2.site.cell.addLeft(p);
	
	this.lasty = e.point.y;
		
	xl.edge.end = p;
	xr.edge.end = p;
	
	var higher;
	var par = p1;
	while(par != this.root)
	{
		par = par.parent;
		if(par == xl) {higher = xl;}
		if(par == xr) {higher = xr;}
	}
	
	higher.edge = new VEdge(p, p0.site, p2.site);

	this.edges.push(higher.edge);
	
	var gparent = p1.parent.parent;
	if(p1.parent.left == p1)
	{
		if(gparent.left  == p1.parent) gparent.left  = p1.parent.right;
		else p1.parent.parent.right = p1.parent.right;
	}
	else
	{
		if(gparent.left  == p1.parent) gparent.left  = p1.parent.left;
		else gparent.right = p1.parent.left;
	}
	
	this.CheckCircle(p0);
	this.CheckCircle(p2)
}

Voronoi.prototype.FinishEdge = function(n)
{
	var mx;
	if(n.edge.direction.x > 0.0)
	{
		mx = Math.max(this.width, n.edge.start.x + 10 );
	}
	else
	{
		mx = Math.min(0.0, n.edge.start.x - 10);
	}
	n.edge.end = new Point(mx, n.edge.f*mx + n.edge.g);
	
	if(!n.left.isLeaf)  this.FinishEdge(n.left);
	if(!n.right.isLeaf) this.FinishEdge(n.right);
}

Voronoi.prototype.GetXOfEdge = function(par, y) // počítá průsečík parabol v daném uzlu
{
	var left =	this.GetLeftChild (par);
	var right =	this.GetRightChild(par);
			
	var p = left.site;
	var r = right.site;
	
	var dp = 2*(p.y - y);
	var a1 = 1/dp;
	var b1 = -2*p.x/dp;
	var c1 = y+dp*0.25 + p.x*p.x/dp;
	
	dp = 2*(r.y - y);
	var a2 = 1/dp;
	var b2 = -2*r.x/dp;
	var c2 = y+dp*0.25 + r.x*r.x/dp;
	
	var a = a1 - a2;
	var b = b1 - b2;
	var c = c1 - c2;
	
	if(a==0) return -c/b;
	
	var disc = b*b - 4 * a * c;
	var x1 = (-b + Math.sqrt(disc)) / (2*a);
	var x2 = (-b - Math.sqrt(disc)) / (2*a);

	var ry;
	if(p.y < r.y ) ry =  Math.max(x1, x2);
	else ry = Math.min(x1, x2);
	
	return ry;
}

Voronoi.prototype.GetParabolaByX = function(xx)
{
	var par = this.root;
	var x = 0;
	
	while(!par.isLeaf)
	{
		x = this.GetXOfEdge(par, this.ly);
		if(x>xx) par = par.left;
		else par = par.right;				
	}
	return par;
}

Voronoi.prototype.GetY = function(p, x) // ohnisko, x-souřadnice, řídící přímka
{
	var dp = 2*(p.y - this.ly);
	var b1 = -2*p.x/dp;
	var c1 = this.ly+dp/4 + p.x*p.x/dp;
	
	return(x*x/dp + b1*x + c1);
}

Voronoi.prototype.CheckCircle = function(b)
{
	var lp = this.GetLeftParent(b);
	var rp = this.GetRightParent(b);
	
	var a = this.GetLeftChild(lp);
	var c = this.GetRightChild(rp);
	
	if(!a || !c || a.site == c.site) return;
	
	var s = this.GetEdgeIntersection(lp.edge, rp.edge);
	if(!s) return;
	
	var d = Point.prototype.distance(a.site, s);
	//if(d > 5000) return;
	if(s.y - d  >= this.ly) return;
	
	var e = new VEvent(new Point(s.x, s.y - d), false);
	
	b.cEvent = e;
	e.arch = b;
	this.queue.enqueue(e);
}

Voronoi.prototype.GetEdgeIntersection = function(a, b)
{
	var I = GetLineIntersection(a.start, a.B, b.start, b.B);
	
	// wrong direction of edge
	var wd = 	(I.x - a.start.x)*a.direction.x<0 || (I.y - a.start.y)*a.direction.y<0	
			 ||	(I.x - b.start.x)*b.direction.x<0 || (I.y - b.start.y)*b.direction.y<0;	
			 
	if(wd) return null;
	return I;
}

Voronoi.prototype.GetLeft = function(n)
{
	return this.GetLeftChild( this.GetLeftParent(n));
}
		
Voronoi.prototype.GetRight = function(n)
{
	return this.GetRightChild(this.GetRightParent(n));
}	
		
Voronoi.prototype.GetLeftParent = function(n)
{
	var par = n.parent;
	var pLast = n;
	while(par.left == pLast) 
	{ 
		if(!par.parent) return null;
		pLast = par; par = par.parent; 
	}
	return par;
}

Voronoi.prototype.GetRightParent = function(n)
{
	var par = n.parent;
	var pLast = n;
	while(par.right == pLast) 
	{	
		if(!par.parent) return null;
		pLast = par; par = par.parent;	
	}
	return par;
}
Voronoi.prototype.GetLeftChild = function(n)
{
	if(!n) return null;
	var par = n.left;
	while(!par.isLeaf) par = par.right;
	return par;
}
Voronoi.prototype.GetRightChild = function(n)
{
	if(!n) return null;
	var par = n.right;
	while(!par.isLeaf) par = par.left;
	return par;
}

function GetLineIntersection(a1, a2, b1, b2)
{			
	var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
	var day = (a1.y-a2.y), dby = (b1.y-b2.y);
			
	var Den = dax*dby - day*dbx;
	if (Den == 0) return null;	// parallel

	var A = (a1.x * a2.y - a1.y * a2.x);
	var B = (b1.x * b2.y - b1.y * b2.x);
		
	var I = new Point(0,0);
	I.x = ( A*dbx - dax*B ) / Den;
	I.y = ( A*dby - day*B ) / Den;
	
	return I;
}

var bugchecksonar  =++
