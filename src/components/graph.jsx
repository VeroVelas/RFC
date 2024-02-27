import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Automata({ rfc }) {
  
    const ref = useRef();

    useEffect(() => {
        if (rfc.length >= 4 && /^V[EJV]{3}$/i.test(rfc)) { // Cambia la expresión regular aquí
            generarAutomata(rfc);
        } else {
            d3.select(ref.current).select("svg").remove();
        }
    }, [rfc]);

    const generarAutomata = (cadena) => {
        d3.select(ref.current).select("svg").remove();

        var estados = [];
        var transiciones = [];

        for (var i = 0; i <= cadena.length; i++) {
            estados.push("q" + i);
            if (i < cadena.length) {
                transiciones.push({
                    source: "q" + i,
                    target: "q" + (i + 1),
                    label: cadena[i]
                });
            }
        }

        var svg = d3.select(ref.current).append("svg")
            .attr("width", 600)
            .attr("height", 150);

        var nodes = svg.selectAll("circle")
            .data(estados)
            .enter().append("circle")
            .attr("cx", function(d, i) { return i * 80 + 40; })
            .attr("cy", 80)
            .attr("r", 20)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "white");

        svg.selectAll("text")
            .data(estados)
            .enter().append("text")
            .attr("x", function(d, i) { return i * 80 + 40; })
            .attr("y", 85)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(function(d) { return d; });

        var links = svg.selectAll(".link")
            .data(transiciones)
            .enter().append("line")
            .attr("x1", function(d) { return (estados.indexOf(d.source) * 80 + 40) + 20; })
            .attr("y1", 80)
            .attr("x2", function(d) { return (estados.indexOf(d.target) * 80 + 40) - 20; })
            .attr("y2", 80)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrowhead)");

        svg.selectAll("text.linkLabel")
            .data(transiciones)
            .enter().append("text")
            .attr("class", "linkLabel")
            .attr("x", function(d) { return (estados.indexOf(d.source) * 80 + estados.indexOf(d.target) * 80) / 2 + 40; })
            .attr("y", 75)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(function(d) { return d.label; });

        svg.append("polygon")
            .attr("points", function() {
                var x = 6;
                var y = 90;
                var size = 15;
                return (x) + "," + (y) + " " + (x - size / 2) + "," + (y - size) + " " + (x + size / 2) + "," + (y - size);
            })
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "white")
            .attr("transform", "rotate(28, 15, 90)");

        svg.append("circle")
            .attr("cx", (estados.length - 1) * 80 + 40)
            .attr("cy", 80)
            .attr("r", 20)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "white");

        svg.append("circle")
            .attr("cx", (estados.length - 1) * 80 + 40)
            .attr("cy", 80)
            .attr("r", 16)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "white");

        svg.append("text")
            .attr("x", (estados.length - 1) * 80 + 40)
            .attr("y", 85)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(estados[estados.length - 1]);

        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
    }

    return <div ref={ref}></div>;
}

export default Automata;