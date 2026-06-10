import { TD, TDl } from "../styles/table";
import { C } from "../theme/colors";

// Jadvalda haqiqiy qatorlar oz bo'lsa, qolgan joyni bo'sh qatorlar bilan to'ldiradi.
// `count` — har sahifada doim `pp` qator ko'rinishini ta'minlash uchun bo'sh qatorlar soni.
// Oxirgi `<tr style={{ height:"100%" }}>` — jadval ichidagi qolgan vertikal bo'shliqni
// to'liq yutadi (parent <table> da `height:100%` bo'lishi shart).
export const FillerRows = ({ count = 0, cols }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <tr key={`filler-${i}`} aria-hidden="true">
        {Array.from({ length: cols }).map((_, j) => {
          const isLast = j === cols - 1;
          return (
            <td key={j} style={isLast ? TDl() : TD()}>&nbsp;</td>
          );
        })}
      </tr>
    ))}
    <tr style={{ height: "100%" }} aria-hidden="true">
      {Array.from({ length: cols }).map((_, j) => {
        const isLast = j === cols - 1;
        return (
          <td key={j} style={{
            borderRight: isLast ? "none" : `1px solid ${C.borderLight}`,
            verticalAlign: "top",
          }}>&nbsp;</td>
        );
      })}
    </tr>
  </>
);
