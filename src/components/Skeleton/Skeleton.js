import { Skeleton as AntDSkeleton } from 'antd';

const Skeleton = ({ loading = true, ...props }) => {
  return (
    <>
      {loading && (
        <span data-testid="skeleton">
          <AntDSkeleton {...props} />
        </span>
      )}
    </>
  );
};

export default Skeleton;
