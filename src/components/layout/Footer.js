import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa", display: "flex", justifyContent: "center" }}>
      <div className="copyright">
        © 2023 FPT Student-Enterprise Connection Platform.
      </div>
    </AntFooter>
  );
}

export default Footer;
