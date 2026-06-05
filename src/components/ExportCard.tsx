import React from 'react';
import { Ingredient } from "@/data/ingredients";

interface ExportCardProps {
  items: { name: string; weight: number; calories: number }[];
  totals: { calories: number; protein: number; fat: number; carbs: number; fiber: number };
  menuName: string;
}

export const ExportCard = React.forwardRef<HTMLDivElement, ExportCardProps>(({ items, totals, menuName }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '600px',
        backgroundColor: '#FAF6EF',
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        borderRadius: '48px',
        color: '#2C1810',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#3D6B4F', borderRadius: '12px' }}></div>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>GIGIZI</span>
        </div>
        <div style={{ fontSize: '10px', color: '#6B5850', textTransform: 'uppercase' }}>
          {new Date().toLocaleDateString("id-ID")}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>{menuName || "Ringkasan Nutrisi"}</h2>
      </div>

      <div style={{ backgroundColor: '#3D6B4F', color: '#FAF6EF', padding: '48px', borderRadius: '40px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7 }}>TOTAL KALORI</h4>
        <div style={{ fontSize: '72px', fontWeight: 'bold' }}>
          {Math.round(totals.calories)}
          <span style={{ fontSize: '20px', opacity: 0.5 }}>kkal</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {[
          { label: 'Protein', value: totals.protein, color: '#3D6B4F' },
          { label: 'Lemak', value: totals.fat, color: '#F5A623' },
          { label: 'Karbo', value: totals.carbs, color: '#E8503A' },
          { label: 'Serat', value: totals.fiber, color: '#6B5850' },
        ].map(n => (
          <div key={n.label} style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '24px', borderRadius: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: n.color }}>{n.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{n.value.toFixed(1)}g</div>
          </div>
        ))}
      </div>
    </div>
  );
});

ExportCard.displayName = 'ExportCard';
