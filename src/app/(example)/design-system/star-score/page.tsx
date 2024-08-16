import StarScore from '@/components/element/StarScore/StarScore';

// URL: http://localhost:3000/design-system/star-score
export default function Page() {
  const array = [0.1, 0.6, 1.1, 1.6, 2.1, 2.6, 3.0, 3.5, 4, 4.5, 5, 5.1];

  return (
    <>
      {array.map(value => (
        <div key={value} style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <StarScore score={value}/>
          <span>{value}</span>
        </div>
      ))}
    </>
  );
}
