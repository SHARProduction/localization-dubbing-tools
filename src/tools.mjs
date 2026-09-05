export const evaluators={
  'asset-localization-coverage-matrix': i=>{const have=new Set((i.assets||[]).map(x=>String(x.locale)+'|'+String(x.type))),missing=[];for(const l of i.requiredLocales||[])for(const t of i.requiredTypes||[])if(!have.has(String(l)+'|'+String(t)))missing.push({locale:l,type:t});return{valid:(i.requiredLocales||[]).length>0&&(i.requiredTypes||[]).length>0&&!missing.length,missing}},
  'dubbing-script-timing-checker': i=>{const rows=(i.lines||[]).map(x=>{const available=Number(x.windowEnd)-Number(x.windowStart);return{...x,availableSeconds:available,overrunSeconds:+Math.max(0,Number(x.dubSeconds)-available).toFixed(2)}});return{valid:rows.length>0&&rows.every(x=>x.overrunSeconds===0),rows}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
