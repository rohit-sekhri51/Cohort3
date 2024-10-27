const style = {width: 200, backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderwidth: 1, padding: 20}

export function PostComponent({name,sub,time,image,desc}) {
// Time if not given, Promoted should be shown
// FIXME
  return <div style={style}>
  <div style={{display: "flex"}}>
    <img src={image} style={{width: 20, height:20, borderRadius: 20}} />
    <div style={{fontSize: 12,marginLeft: 10}}>
      <b>{name}</b>
      <div>{sub}</div>
      {time && <div style={{display: "flex"}}>
        <div>{time}</div>
        <img src={"https://imgs.search.brave.com/Kjvhb7eUQsdA6IBLyR07mXGf7aKCiGHOCGMhOpJs47o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgz/ODEyMjUxL3Bob3Rv/L3RpbWUtZmx5Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz14/S1F0NG9CVTBVbkJw/TEFUNlF0Y2wyZC1y/NmFUOGdqZzNiYVZK/NUxfWDR3PQ"}
        style={{width: 10, height: 10}} />
      </div>}
    </div>
  </div>
  <div style={{fontSize: 15}}>
      {desc}
    </div>
  </div>
}
