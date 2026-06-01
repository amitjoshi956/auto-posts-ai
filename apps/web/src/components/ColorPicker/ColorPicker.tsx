import { FC } from 'react';
import { classes } from '@common/utils';

import './ColorPicker.scss';

const PickerColors = {
  DEFAULT: '#ffffff',
  DEFAULT_GRADIENT: 'linear-gradient(135deg, #02d0d0, #3e92ccff, #d97df0ff 65%, #ffee58)',
};

type ColorPickerProps = {
  className?: string;
  value: string;
  presetColors?: string[];
  onChange: (color: string) => void;
};

const ColorPicker: FC<ColorPickerProps> = ({ className, value, presetColors = [], onChange }) => {
  const isCustomColor = Boolean(value) && !presetColors.includes(value);
  const colorPresetIcon = isCustomColor ? '✓' : '+';
  const pickerValue = isCustomColor ? value : PickerColors.DEFAULT;

  const pickerClass = classes({
    'color-picker__preset': true,
    'color-picker__preset--selected': isCustomColor,
  });

  const pickerBg = isCustomColor ? value : PickerColors.DEFAULT_GRADIENT;

  return (
    <div className={classes({ 'color-picker': true, className: Boolean(className) })}>
      {presetColors.map((preset) => {
        const isSelected = value === preset;
        const presetColorClass = classes({
          'color-picker__preset': true,
          'color-picker__preset--selected': isSelected,
        });

        const handlePresetClick = () => {
          if (isSelected) {
            return;
          }

          onChange(preset);
        };

        return (
          <button
            key={preset}
            type="button"
            className={presetColorClass}
            style={{ backgroundColor: preset }}
            aria-label={`Select color ${preset}`}
            onClick={handlePresetClick}
          >
            {isSelected && <span className="color-picker__preset-icon">✓</span>}
          </button>
        );
      })}

      <div className="color-picker__custom-preset-wrapper" style={{ background: pickerBg }}>
        <label className={pickerClass} aria-label="Custom color picker">
          <input
            type="color"
            className="color-picker__input"
            value={pickerValue}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="color-picker__preset-icon">{colorPresetIcon}</span>
        </label>
      </div>
    </div>
  );
};

export default ColorPicker;
