/**
 * Help Tooltip Utilities
 * Positioning and calculation utilities for HelpTooltip
 */

interface TooltipLayout {
  width: number;
  height: number;
}

interface TargetLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export const calculateTooltipPosition = (
  targetLayout: TargetLayout,
  tooltipLayout: TooltipLayout,
  screenWidth: number,
  screenHeight: number
): { position: TooltipPosition; style: any } => {
  const padding = 12;
  const arrowSize = 8;
  let position: TooltipPosition = 'bottom';
  let style: any = {};

  // Check available space and determine best position
  const spaceAbove = targetLayout.y;
  const spaceBelow = screenHeight - (targetLayout.y + targetLayout.height);
  const spaceLeft = targetLayout.x;
  const spaceRight = screenWidth - (targetLayout.x + targetLayout.width);

  // Prefer bottom, then top, then sides
  if (spaceBelow >= tooltipLayout.height + arrowSize + padding) {
    position = 'bottom';
    style = {
      top: targetLayout.y + targetLayout.height + arrowSize + padding,
      left: Math.max(
        padding,
        Math.min(
          targetLayout.x + targetLayout.width / 2 - tooltipLayout.width / 2,
          screenWidth - tooltipLayout.width - padding
        )
      ),
    };
  } else if (spaceAbove >= tooltipLayout.height + arrowSize + padding) {
    position = 'top';
    style = {
      top: targetLayout.y - tooltipLayout.height - arrowSize - padding,
      left: Math.max(
        padding,
        Math.min(
          targetLayout.x + targetLayout.width / 2 - tooltipLayout.width / 2,
          screenWidth - tooltipLayout.width - padding
        )
      ),
    };
  } else if (spaceRight >= tooltipLayout.width + arrowSize + padding) {
    position = 'right';
    style = {
      left: targetLayout.x + targetLayout.width + arrowSize + padding,
      top: Math.max(
        padding,
        Math.min(
          targetLayout.y + targetLayout.height / 2 - tooltipLayout.height / 2,
          screenHeight - tooltipLayout.height - padding
        )
      ),
    };
  } else {
    position = 'left';
    style = {
      left: Math.max(padding, targetLayout.x - tooltipLayout.width - arrowSize - padding),
      top: Math.max(
        padding,
        Math.min(
          targetLayout.y + targetLayout.height / 2 - tooltipLayout.height / 2,
          screenHeight - tooltipLayout.height - padding
        )
      ),
    };
  }

  return { position, style };
};

export const getArrowStyle = (position: TooltipPosition): any => {
  const arrowSize = 8;
  
  switch (position) {
    case 'bottom':
      return {
        position: 'absolute',
        top: -arrowSize,
        left: '50%',
        marginLeft: -arrowSize,
        width: 0,
        height: 0,
        borderLeftWidth: arrowSize,
        borderRightWidth: arrowSize,
        borderBottomWidth: arrowSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#1f2937',
      };
    case 'top':
      return {
        position: 'absolute',
        bottom: -arrowSize,
        left: '50%',
        marginLeft: -arrowSize,
        width: 0,
        height: 0,
        borderLeftWidth: arrowSize,
        borderRightWidth: arrowSize,
        borderTopWidth: arrowSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#1f2937',
      };
    case 'left':
      return {
        position: 'absolute',
        right: -arrowSize,
        top: '50%',
        marginTop: -arrowSize,
        width: 0,
        height: 0,
        borderTopWidth: arrowSize,
        borderBottomWidth: arrowSize,
        borderLeftWidth: arrowSize,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#1f2937',
      };
    case 'right':
      return {
        position: 'absolute',
        left: -arrowSize,
        top: '50%',
        marginTop: -arrowSize,
        width: 0,
        height: 0,
        borderTopWidth: arrowSize,
        borderBottomWidth: arrowSize,
        borderRightWidth: arrowSize,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#1f2937',
      };
    default:
      return {};
  }
};