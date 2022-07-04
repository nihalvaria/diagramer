import { TGenerateDiagram } from 'types';
import { rotate } from './utils/transform';
import { fillColor } from './utils/styling';

export const generateDiagram: TGenerateDiagram = diagramConfig => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.width = diagramConfig.width || 100;
    canvas.height = diagramConfig.height || 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const centerOrigin = diagramConfig.centerOrigin || false;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.rect(0, 0, canvas.width, canvas.height);

    fillColor(ctx, diagramConfig.backgroundColor);
    rotate(ctx, centerX, centerY, diagramConfig.rotation);

    diagramConfig.sections.forEach(section => {
        ctx.beginPath();
        section.points.forEach(point => {
            if (centerOrigin) {
                point.x += centerX;
                point.y += centerY;
            }
            ctx.lineTo(point.x, point.y);
        });
        fillColor(ctx, section.backgroundColor);
        ctx.stroke();
    });

    return { diagram: canvas.toDataURL() };
};
